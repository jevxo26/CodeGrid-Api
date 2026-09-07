import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum IncompleteOrderStatus {
  PENDING = 'Pending',
  RECOVERED = 'Recovered',
  LOST = 'Lost',
}

@Entity('incomplete_orders')
export class IncompleteOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  customerName: string;

  @Column({ nullable: true })
  customerEmail: string;

  @Column({ nullable: true })
  customerPhone: string;

  @Column({ type: 'jsonb', nullable: true })
  selectedProducts: { productId: number; quantity: number; productName?: string }[];

  @Column({
    type: 'enum',
    enum: IncompleteOrderStatus,
    default: IncompleteOrderStatus.PENDING,
  })
  status: IncompleteOrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
