import { Controller, Inject } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  public constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
  ) {}
}
