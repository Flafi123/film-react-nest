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
    if (!dto.tickets || dto.tickets.length === 0) {
      throw new BadRequestException(
        'Массив билетов (tickets) пуст или отсутствует',
      );
    }

    const firstTicket = dto.tickets[0] as any;

    const targetFilmId = firstTicket.film || dto.filmId || (dto as any).film_id;
    const targetSessionId =
      firstTicket.session || dto.sessionId || (dto as any).session_id;
    const targetDay = firstTicket.day || dto.day;
    const targetTime = firstTicket.time || dto.time;

    if (!targetFilmId) {
      throw new BadRequestException(
        'Идентификатор фильма (film) отсутствует в данных билета',
      );
    }
    if (!targetSessionId) {
      throw new BadRequestException(
        'Идентификатор сеанса (session) отсутствует в данных билета',
      );
    }

    const film = await this.filmsRepository.findById(targetFilmId);
    if (!film) {
      throw new NotFoundException(`Фильм с ID ${targetFilmId} не найден`);
    }

    const session = film.schedule.find((s) => s.id === targetSessionId);
    if (!session) {
      throw new NotFoundException(`Сеанс с ID ${targetSessionId} не найден`);
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
      filmId: targetFilmId,
      sessionId: targetSessionId,
      day: targetDay || '',
      time: targetTime || '',
      email: dto.email,
      tickets: ticketsWithAddress,
    });

    const resultOrderId = savedOrder
      ? (savedOrder as any).id || (savedOrder as any)._id
      : null;
    const orderStringId = resultOrderId ? resultOrderId.toString() : 'success';

    const items = ticketsWithAddress.map((ticket) => ({
      id: orderStringId,
      film: targetFilmId,
      session: targetSessionId,
      daytime: session.daytime || '',
      day: targetDay || '',
      time: targetTime || '',
      row: ticket.row,
      seat: ticket.seat,
      price: session.price || 0,
    }));

    return {
      total: items.length,
      items: items,
    };
  }
}
