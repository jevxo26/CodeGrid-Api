import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';
import { UpdateCustomOrderDto } from './dto/update-custom-order.dto';
import { CustomOrder } from './entities/custom-order.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class CustomOrdersService {
  constructor(
    @InjectRepository(CustomOrder)
    private readonly customOrderRepository: Repository<CustomOrder>,
    private readonly mailService: MailService,
  ) {}

  async create(createCustomOrderDto: CreateCustomOrderDto): Promise<CustomOrder> {
    const { userId, ...rest } = createCustomOrderDto;
    const customOrder = this.customOrderRepository.create({
      ...rest,
      user: { id: userId },
    });
    return await this.customOrderRepository.save(customOrder);
  }

  async findAll(): Promise<CustomOrder[]> {
    return await this.customOrderRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CustomOrder> {
    const customOrder = await this.customOrderRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!customOrder) {
      throw new NotFoundException(`Custom Order with ID ${id} not found`);
    }
    return customOrder;
  }

  async update(id: number, updateCustomOrderDto: UpdateCustomOrderDto): Promise<CustomOrder> {
    const customOrder = await this.findOne(id);
    const { userId, ...rest } = updateCustomOrderDto as any;

    if (userId !== undefined) {
      customOrder.user = { id: userId } as any;
    }

    Object.assign(customOrder, rest);
    return await this.customOrderRepository.save(customOrder);
  }

  async updateStatus(id: number, status: string): Promise<CustomOrder> {
    const customOrder = await this.findOne(id);
    const oldStatus = customOrder.status;

    customOrder.status = status as any;
    const updatedCustomOrder = await this.customOrderRepository.save(customOrder);

    if (oldStatus !== status) {
      if (updatedCustomOrder.user && updatedCustomOrder.user.email) {
        this.mailService.sendCustomOrderStatusUpdateEmail(
          updatedCustomOrder.user.email,
          updatedCustomOrder.id,
          updatedCustomOrder.status,
        );
      }
    }

    return updatedCustomOrder;
  }

  async remove(id: number): Promise<void> {
    const customOrder = await this.findOne(id);
    await this.customOrderRepository.remove(customOrder);
  }
}
