import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { FilmsRepository } from '../repository/films.repository';
import { OrdersRepository } from '../repository/orders.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const film = await this.filmsRepository.findById(dto.filmId);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${dto.filmId} не найден`);
    }

    const session = film.schedule.find((s) => s.id === dto.sessionId);
    if (!session) {
      throw new NotFoundException(`Сеанс с ID ${dto.sessionId} не найден`);
    }

    if (!session.taken) {
      session.taken = [];
    }

    const incomingSeats = dto.tickets.map((t) => `${t.row}:${t.seat}`);
    const ticketsWithAddress = dto.tickets.map((t) => ({
      row: t.row,
      seat: t.seat,
      seatAddress: `${t.row}:${t.seat}`,
    }));

    for (const seat of incomingSeats) {
      if (session.taken.includes(seat)) {
        throw new BadRequestException(
          `Кресло ${seat} уже занято на этот сеанс!`,
        );
      }
    }

    session.taken.push(...incomingSeats);
    await this.filmsRepository.save(film);

    const savedOrder = await this.ordersRepository.create({
      filmId: dto.filmId,
      sessionId: dto.sessionId,
      day: dto.day,
      time: dto.time,
      email: dto.email,
      tickets: ticketsWithAddress,
    });

    return {
      orderId: savedOrder._id.toString(),
      status: 'created',
    };
  }
}
