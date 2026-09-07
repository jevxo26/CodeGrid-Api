import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncompleteOrdersService } from './incomplete-orders.service';
import { IncompleteOrdersController } from './incomplete-orders.controller';
import { IncompleteOrder } from './entities/incomplete-order.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([IncompleteOrder]), MailModule],
  controllers: [IncompleteOrdersController],
  providers: [IncompleteOrdersService],
  exports: [IncompleteOrdersService],
})
export class IncompleteOrdersModule {}
