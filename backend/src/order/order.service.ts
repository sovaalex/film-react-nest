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
    const uniqueFilmIds = Array.from(
      new Set(orders.map((order) => order.film)),
    );
    const filmsMap = new Map<string, any>();

    for (const filmId of uniqueFilmIds) {
      const film = await this.filmsRepository.findById(filmId);
      if (!film) {
        throw new BadRequestException(`Фильм с id ${filmId} не найден`);
      }
      filmsMap.set(filmId, film);
    }

    for (const order of orders) {
      const film = filmsMap.get(order.film.toString());

      const session = film.schedule.find((s: any) => s.id === order.session);
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
    }

    for (const film of filmsMap.values()) {
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
