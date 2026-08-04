import { FilmEntity } from './film.entity';

export class FilmMapper {
  private static cleanImagePath(path: string): string {
    if (!path) return '';

    let cleaned = path.replace('content/afishabg', 'content/afisha/bg');
    cleaned = cleaned.replace(
      /\/content\/afisha\/content\/afisha\//g,
      '/content/afisha/',
    );
    cleaned = '/' + cleaned.replace(/^\/+/, '');

    return cleaned;
  }

  static toResponseDto(film: FilmEntity) {
    return {
      id: film.id,
      title: film.title,
      director: film.director,
      rating: film.rating,
      tags: film.tags,
      // Применяем очистку ко всем полям картинок uniform-но
      image: FilmMapper.cleanImagePath(film.image),
      cover: FilmMapper.cleanImagePath(film.cover),
      about: film.about,
      description: film.description,
    };
  }

  static toScheduleDto(film: FilmEntity) {
    return {
      filmId: film.id,
      sessions: film.schedule
        ? film.schedule.map((session) => ({
            id: session.id,
            time: session.daytime,
            price: session.price,
            hall: session.hall,
            rows: session.rows,
            seats: session.seats,
            taken: session.taken,
          }))
        : [],
    };
  }
}
