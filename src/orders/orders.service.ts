import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';
import { MailService } from '../mail/mail.service';
import { Inventory } from '../inventory/entities/inventory.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly mailService: MailService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items, userId, ...rest } = createOrderDto;
    const orderItems = items?.map((item) => ({
      product: { id: item.productId },
      quantity: item.quantity,
    }));

    const order = this.orderRepository.create({
      ...rest,
      user: { id: userId },
      items: orderItems,
    });
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        items: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const { items, userId, ...rest } = updateOrderDto as any;
    
    if (items) {
      order.items = items.map((item) => ({
        product: { id: item.productId },
        quantity: item.quantity,
      })) as any;
    }

    if (userId !== undefined) {
      order.user = { id: userId } as any;
    }
    
    Object.assign(order, rest);
    return await this.orderRepository.save(order);
  }

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.findOne(id);
    const oldStatus = order.status;
    
    order.status = status as any;
    const updatedOrder = await this.orderRepository.save(order);

    if (oldStatus !== status) {
      if (status === OrderStatus.SHIPPED) {
        for (const item of updatedOrder.items) {
          if (item.product?.title) {
            const inventory = await this.inventoryRepository.findOne({ where: { product: item.product.title } });
            if (inventory) {
              inventory.stock = Math.max(0, inventory.stock - item.quantity);
              await this.inventoryRepository.save(inventory);
            }
          }
        }
      } else if (status === OrderStatus.REFUNDED) {
        for (const item of updatedOrder.items) {
          if (item.product?.title) {
            const inventory = await this.inventoryRepository.findOne({ where: { product: item.product.title } });
            if (inventory) {
              inventory.stock += item.quantity;
              await this.inventoryRepository.save(inventory);
            }
          }
        }
      }

      if (updatedOrder.user && updatedOrder.user.email) {
        this.mailService.sendOrderStatusUpdateEmail(
          updatedOrder.user.email,
          updatedOrder.id,
          updatedOrder.status,
        );
      }
    }

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
