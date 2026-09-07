import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, AfterLoad, AfterInsert, AfterUpdate } from 'typeorm';

@Entity('calculations')
export class Calculator {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  buyingPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  designCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  additionalCost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  sellingPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Calculated fields
  unitCost: number;
  rowTotalCost: number;
  rowTotalRevenue: number;
  rowTotalProfit: number;
  margin: string;

  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  calculateTotals() {
    this.unitCost = Number(this.buyingPrice) + Number(this.designCost) + Number(this.additionalCost);
    this.rowTotalCost = this.unitCost * this.quantity;
    this.rowTotalRevenue = Number(this.sellingPrice) * this.quantity;
    this.rowTotalProfit = (Number(this.sellingPrice) - this.unitCost) * this.quantity;
    this.margin = Number(this.sellingPrice) > 0 
      ? (((Number(this.sellingPrice) - this.unitCost) / Number(this.sellingPrice)) * 100).toFixed(2) 
      : "0.00";
  }
}
