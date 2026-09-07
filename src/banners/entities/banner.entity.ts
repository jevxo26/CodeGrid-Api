import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum BannerStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column({ nullable: true })
  tag: string;

  @Column()
  link: string;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'enum',
    enum: BannerStatus,
    default: BannerStatus.ACTIVE,
  })
  status: BannerStatus;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
