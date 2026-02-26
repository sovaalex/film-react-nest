import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../schemas/order.schema';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  create(orderData: CreateOrderDto) {
    return this.orderModel.create(orderData);
  }

  createMany(orderData: CreateOrderDto[]) {
    return this.orderModel.insertMany(orderData);
  }
}
