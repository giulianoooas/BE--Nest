import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  public constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}

  @Get(':userId')
  public async getAllUserOrders(
    @Param('userId') userId: number,
  ): Promise<Order[]> {
    return this.orderService.getAllUserOrders(userId);
  }

  @Patch('increase')
  public async increaseOrder(
    @Body() body: { bookId: number; userId: number },
  ): Promise<void> {
    this.orderService.increaseOrderNumber(body.bookId, body.userId);
  }

  @Patch('decrease')
  public async decreaseOrder(
    @Body() body: { bookId: number; userId: number },
  ): Promise<void> {
    this.orderService.decreaseOrderNumber(body.bookId, body.userId);
  }
}
