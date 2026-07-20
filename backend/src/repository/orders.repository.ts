import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(orderData: Partial<OrderEntity>): Promise<OrderEntity> {
    const newOrder = this.orderRepository.create(orderData);
    return this.orderRepository.save(newOrder);
  }
}
