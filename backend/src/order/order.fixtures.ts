import { CreateOrderDto, TicketDto } from './dto/order.dto';

const tickets: TicketDto[] = [
    { row: 1, seat: 1 },
]

export const orderFixture: CreateOrderDto = {
  filmId: 'film-123',
  sessionId: 'session-456',
  day: '2026-07-27',
  time: '20:00',
  email: 'user@example.com',
  tickets: tickets
};
