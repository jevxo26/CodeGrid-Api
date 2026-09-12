import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { Product } from '../products/entities/product.entity';
import { StockHistory } from './entities/stock-history.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(StockHistory)
    private readonly stockHistoryRepository: Repository<StockHistory>,
  ) {}

  async logHistory(inventory: Inventory, changeAmount: number, reason: string): Promise<void> {
    const history = this.stockHistoryRepository.create({
      inventory,
      changeAmount,
      reason,
    });
    await this.stockHistoryRepository.save(history);
  }

  async getHistory(inventoryId: number): Promise<StockHistory[]> {
    return await this.stockHistoryRepository.find({
      where: { inventory: { id: inventoryId } },
      order: { createdAt: 'DESC' },
    });
  }

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryDto);
    const savedInventory = await this.inventoryRepository.save(inventory);

    // Sync stock with Product
    if (savedInventory.product && savedInventory.stock) {
      const productEntity = await this.productRepository.findOne({ where: { title: savedInventory.product } });
      if (productEntity) {
        productEntity.stock = (productEntity.stock || 0) + savedInventory.stock;
        await this.productRepository.save(productEntity);
      }
    }

    if (savedInventory.stock) {
      await this.logHistory(savedInventory, savedInventory.stock, `Initial Stock added by Admin`);
    }

    return savedInventory;
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }
    return inventory;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);
    const oldStock = inventory.stock;
    Object.assign(inventory, updateInventoryDto);
    const updatedInventory = await this.inventoryRepository.save(inventory);

    if (updateInventoryDto.stock !== undefined && updateInventoryDto.stock !== oldStock) {
      const difference = updateInventoryDto.stock - oldStock;
      const amountStr = difference > 0 ? `+${difference}` : `${difference}`;
      await this.logHistory(updatedInventory, difference, `Manual Adjustment by Admin`);
    }

    return updatedInventory;
  }

  async remove(id: number): Promise<void> {
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
  }

  async adjustStockByProduct(productTitle: string, changeAmount: number, reason: string): Promise<Inventory | null> {
    const inventory = await this.inventoryRepository.findOne({ where: { product: productTitle } });
    if (!inventory) return null;

    inventory.stock = Math.max(0, inventory.stock + changeAmount);
    const updatedInventory = await this.inventoryRepository.save(inventory);
    
    await this.logHistory(updatedInventory, changeAmount, reason);
    return updatedInventory;
  }
}
