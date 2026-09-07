import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const { userId, ...rest } = createFeedbackDto;
    const feedbackData: any = { ...rest };
    if (userId) {
      feedbackData.user = { id: userId };
    }
    const feedback = this.feedbackRepository.create(feedbackData as Feedback);
    return await this.feedbackRepository.save(feedback);
  }

  async findAll(): Promise<Feedback[]> {
    return await this.feedbackRepository.find({
      relations: { user: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    const feedback = await this.findOne(id);
    const { userId, ...rest } = updateFeedbackDto as any;

    if (userId !== undefined) {
      feedback.user = userId ? ({ id: userId } as any) : null;
    }

    Object.assign(feedback, rest);
    return await this.feedbackRepository.save(feedback);
  }

  async remove(id: number): Promise<void> {
    const feedback = await this.findOne(id);
    await this.feedbackRepository.remove(feedback);
  }
}
