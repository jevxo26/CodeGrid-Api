import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('campaign_notices')
export class CampaignNotice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  campaignName: string;

  @Column()
  offerText: string;

  @Column()
  date: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
