export class TicketDto {
  row: number;
  seat: number;
}

export class CreateOrderDto {
  filmId: string;
  sessionId: string;
  day: string;
  time: string;
  email: string;
  tickets: TicketDto[];
}
