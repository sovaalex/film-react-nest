import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepository } from '../repository/order.repository';
import { FilmsRepository } from '../repository/films.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private filmsRepository: FilmsRepository,
  ) {}

  async createOrders(orders: CreateOrderDto[]): Promise<OrderResponseDto> {
    for (const order of orders) {
      const film = await this.filmsRepository.findById(order.film);

      if (!film) {
        throw new BadRequestException(`Фильм с id ${order.film} не найден`);
      }

      const session = film.schedule.find((s) => s.id === order.session);

      if (!session) {
        throw new BadRequestException(
          `Сеанс с id ${order.session} не найден для фильма ${order.film}`,
        );
      }

      const seatKey = `${order.row}:${order.seat}`;

      if (session.taken && session.taken.includes(seatKey)) {
        throw new BadRequestException(
          `Место ${seatKey} было выкуплено на сеанс ${order.session}`,
        );
      }

      if (!session.taken) {
        session.taken = [];
      }
      session.taken.push(seatKey);

      await this.filmsRepository.updateFilm(film);
    }

    const result = await this.orderRepository.createMany(orders);

    return {
      total: result.length,
      items: result.map((order) => ({
        ...order.toObject(),
        id: order.id,
      })),
    };
  }
}
