import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderBook } from '../dto/order-book.dto';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Book } from '../entities/book.entity';

@Injectable()
export class OrderService {
  public constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  public async getAllUserOrders(userId: number): Promise<OrderBook[]> {
    try {
      const orders = await this.orderRepository.find({
        where: {
          userId: userId,
        },
      });
      const res: OrderBook[] = [];
      for (const order of orders) {
        const book = await this.bookRepository.findOne({
          where: {
            bookId: order.bookId,
          },
        });
        res.push({
          imageUrl: book.imageUrl,
          date: order.date,
          numberOfElements: order.numberOfElements,
          name: book.name,
          bookId: book.bookId,
        });
      }
      return res;
    } catch (error) {}
  }

  private async getOrder(
    bookId: number,
    userId: number,
  ): Promise<Order | undefined> {
    return await this.orderRepository.findOne({
      where: {
        bookId,
        userId,
      },
    });
  }

  public async deleteAllUserOrders(userId: number): Promise<void> {
    try {
      const orders = await this.orderRepository.find({
        where: {
          userId: userId,
        },
      });
      for (const order of orders) {
        await this.orderRepository.remove(order);
      }
    } catch (error) {}
  }

  public async deleteAllBookOrders(bookId: number): Promise<void> {
    try {
      const orders = await this.orderRepository.find({
        where: {
          bookId,
        },
      });
      for (const order of orders) {
        await this.orderRepository.remove(order);
      }
    } catch (error) {}
  }

  public async increaseOrderNumber(
    bookId: number,
    userId: number,
  ): Promise<void> {
    try {
      const order = await this.getOrder(bookId, userId);
      if (order) {
        await this.orderRepository.save({
          orderId: order.orderId,
          bookId: bookId,
          userId: userId,
          date: new Date().toString(),
          numberOfElements: order.numberOfElements + 1,
        });
      } else {
        await this.orderRepository.save({
          bookId: bookId,
          userId: userId,
          date: new Date().toString(),
          numberOfElements: 1,
        });
      }
    } catch (error) {}
  }

  public async decreaseOrderNumber(
    bookId: number,
    userId: number,
  ): Promise<void> {
    try {
      const order = await this.getOrder(bookId, userId);
      if (order.numberOfElements > 1) {
        await this.orderRepository.save({
          orderId: order.orderId,
          bookId: bookId,
          userId: userId,
          date: new Date().toString(),
          numberOfElements: order.numberOfElements - 1,
        });
      } else {
        await this.orderRepository.remove(order);
      }
    } catch (error) {}
  }
}
