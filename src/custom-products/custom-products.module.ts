import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomProductsService } from './custom-products.service';
import { CustomProductsController } from './custom-products.controller';
import { CustomProduct } from './entities/custom-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomProduct])],
  controllers: [CustomProductsController],
  providers: [CustomProductsService],
  exports: [CustomProductsService],
})
export class CustomProductsModule {}
