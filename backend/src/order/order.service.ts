import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(dto: CreateOrderDto) {
    const film = await this.filmsRepository.findById(dto.filmId);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${dto.filmId} не найден`);
    }

    const session = film.schedule.find((s) => s.id === dto.sessionId);
    if (!session) {
      throw new NotFoundException(
        `Сеанс с ID ${dto.sessionId} не найден для этого фильма`,
      );
    }

    if (!session.taken) {
      session.taken = [];
    }

    const incomingSeats = dto.tickets.map(
      (ticket) => `${ticket.row}:${ticket.seat}`,
    );

    for (const seat of incomingSeats) {
      if (session.taken.includes(seat)) {
        throw new BadRequestException(
          `Кресло ${seat} уже занято на этот сеанс!`,
        );
      }
    }

    session.taken.push(...incomingSeats);

    await this.filmsRepository.save(film);

    return {
      orderId: `order-${Date.now()}`,
      status: 'created',
    };
  }
}
