import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('budget_picks')
export class BudgetPick {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  packagePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'budget_pick_products' })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
