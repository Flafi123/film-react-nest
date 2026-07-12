import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOrder } from './order.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<IOrder>,
  ) {}

  async create(orderData: any): Promise<IOrder> {
    const newOrder = new this.orderModel(orderData);
    return newOrder.save();
  }
}
