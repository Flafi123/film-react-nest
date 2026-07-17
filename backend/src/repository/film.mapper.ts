import { IFilm } from './film.schema';
import { FilmResponseDto, ScheduleResponseDto } from '../films/dto/films.dto';

export class FilmMapper {
  private static cleanImagePath(path: string): string {
    return path.startsWith('/') ? path.slice(1) : path;
  }
  

  static toResponseDto(film: IFilm): FilmResponseDto {
    let correctedImage = film.image;
    if (correctedImage.includes('content/afishabg')) {
      correctedImage = correctedImage.replace('content/afishabg', 'content/afisha/bg');
    }
    return {
      id: film.id,
      title: film.title,
      director: film.director,
      rating: film.rating,
      tags: film.tags,
      image: this.cleanImagePath(film.image),
      cover: this.cleanImagePath(film.cover),
      about: film.about,
      description: film.description,
    };
  }

  static toScheduleDto(film: IFilm): ScheduleResponseDto {
    return {
      filmId: film.id,
      sessions: film.schedule.map((session) => ({
        id: session.id,
        time: session.daytime,
        price: session.price,
      })),
    };
  }
}
