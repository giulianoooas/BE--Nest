import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Book])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
