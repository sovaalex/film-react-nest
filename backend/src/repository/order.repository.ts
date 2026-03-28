import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  create(orderData: CreateOrderDto) {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  createMany(orderData: CreateOrderDto[]) {
    const orders = this.orderRepository.create(orderData);
    return this.orderRepository.save(orders);
  }
}
