export class SessionDto {
  id: string;
  time: string;
  price: number;
}

export class FilmResponseDto {
  id: string;
  title: string;
  director: string;
  rating: number;
  tags: string[];
  image: string;
  cover: string;
  about: string;
  description: string;
}

export class ScheduleResponseDto {
  filmId: string;
  sessions: SessionDto[];
}
