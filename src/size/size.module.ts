import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { Size } from './entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}
