import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncompleteOrderDto } from './dto/create-incomplete-order.dto';
import { UpdateIncompleteOrderDto } from './dto/update-incomplete-order.dto';
import { IncompleteOrder } from './entities/incomplete-order.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class IncompleteOrdersService {
  constructor(
    @InjectRepository(IncompleteOrder)
    private readonly incompleteOrderRepository: Repository<IncompleteOrder>,
    private readonly mailService: MailService,
  ) {}

  async create(createIncompleteOrderDto: CreateIncompleteOrderDto): Promise<IncompleteOrder> {
    const incompleteOrder = this.incompleteOrderRepository.create(createIncompleteOrderDto);
    const savedOrder = await this.incompleteOrderRepository.save(incompleteOrder);
    
    // Optionally send abandoned cart email immediately or logic can be handled via cron job
    if (savedOrder.customerEmail) {
      this.mailService.sendAbandonedCartEmail(savedOrder.customerEmail, savedOrder.customerName);
    }

    return savedOrder;
  }

  async findAll(): Promise<IncompleteOrder[]> {
    return await this.incompleteOrderRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<IncompleteOrder> {
    const incompleteOrder = await this.incompleteOrderRepository.findOne({ where: { id } });
    if (!incompleteOrder) {
      throw new NotFoundException(`Incomplete Order with ID ${id} not found`);
    }
    return incompleteOrder;
  }

  async update(id: number, updateIncompleteOrderDto: UpdateIncompleteOrderDto): Promise<IncompleteOrder> {
    const incompleteOrder = await this.findOne(id);
    Object.assign(incompleteOrder, updateIncompleteOrderDto);
    return await this.incompleteOrderRepository.save(incompleteOrder);
  }

  async remove(id: number): Promise<void> {
    const incompleteOrder = await this.findOne(id);
    await this.incompleteOrderRepository.remove(incompleteOrder);
  }

  async triggerAbandonedCartEmail(id: number): Promise<{ message: string }> {
    const incompleteOrder = await this.findOne(id);
    if (!incompleteOrder.customerEmail) {
      throw new NotFoundException(`No email found for Incomplete Order with ID ${id}`);
    }
    
    await this.mailService.sendAbandonedCartEmail(
      incompleteOrder.customerEmail,
      incompleteOrder.customerName,
    );
    
    return { message: 'Abandoned cart email sent successfully' };
  }
}
