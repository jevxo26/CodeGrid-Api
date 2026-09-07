import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum FeedbackStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: FeedbackStatus,
    default: FeedbackStatus.ACTIVE,
  })
  status: FeedbackStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
