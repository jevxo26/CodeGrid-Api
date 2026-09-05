import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('flashsells')
export class Flashsell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage: number;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'flashsell_products' })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
