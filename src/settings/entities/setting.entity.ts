import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'CodeGrid Fashion' })
  storeName: string;

  @Column({ default: 'support@codegrid.com' })
  contactEmail: string;

  @Column({ default: '+880 1711-000000' })
  phoneNumber: string;

  @Column({ default: '+880 1811-000000' })
  supportWhatsapp: string;

  @Column({ type: 'text', nullable: true })
  storeDescription: string;

  @Column({ default: true })
  orderConfirmations: boolean;

  @Column({ default: true })
  adminOrderAlerts: boolean;

  @Column({ default: false })
  abandonedCartReminders: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
