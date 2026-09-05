import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashsellService } from './flashsell.service';
import { FlashsellController } from './flashsell.controller';
import { Flashsell } from './entities/flashsell.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flashsell, Product])],
  controllers: [FlashsellController],
  providers: [FlashsellService],
})
export class FlashsellModule {}
