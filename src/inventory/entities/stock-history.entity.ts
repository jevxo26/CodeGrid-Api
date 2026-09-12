import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Inventory } from './inventory.entity';

@Entity('stock_history')
export class StockHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inventoryId' })
  inventory: Inventory;

  @Column()
  changeAmount: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;
}
