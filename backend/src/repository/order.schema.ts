import { Schema, Document } from 'mongoose';

export interface ITicket {
  row: number;
  seat: number;
  seatAddress: string;
}

export interface IOrder extends Document {
  filmId: string;
  sessionId: string;
  day: string;
  time: string;
  email: string;
  tickets: ITicket[];
}

const TicketSchema = new Schema<ITicket>(
  {
    row: { type: Number, required: true },
    seat: { type: Number, required: true },
    seatAddress: { type: String, required: true },
  },
  { _id: false },
);

export const OrderSchema = new Schema<IOrder>(
  {
    filmId: { type: String, required: true },
    sessionId: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    email: { type: String, required: true },
    tickets: { type: [TicketSchema], required: true },
  },
  { collection: 'orders' },
);
