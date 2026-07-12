import { Schema, Document } from 'mongoose';

export interface ISession {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export interface IFilm extends Document {
  id: string;
  title: string;
  director: string;
  rating: number;
  tags: string[];
  image: string;
  cover: string;
  about: string;
  description: string;
  schedule: ISession[];
}

const SessionSchema = new Schema<ISession>(
  {
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: Number, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  },
  { _id: false },
);

export const FilmSchema = new Schema<IFilm>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    director: { type: String, required: true },
    rating: { type: Number, required: true },
    tags: { type: [String], default: [] },
    image: { type: String, required: true },
    cover: { type: String, required: true },
    about: { type: String, required: true },
    description: { type: String, required: true },
    schedule: { type: [SessionSchema], default: [] },
  },
  { collection: 'films' },
);
