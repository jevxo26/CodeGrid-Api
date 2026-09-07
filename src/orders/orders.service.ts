import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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
