import { FilmEntity } from './film.entity';
export class FilmMapper {
  private static cleanImagePath(path: string): string {
    return path.startsWith('/') ? path.slice(1) : path;
  }

  static toResponseDto(film: FilmEntity) {
    let correctedImage = film.image;
    if (correctedImage.includes('content/afishabg')) {
      correctedImage = correctedImage.replace(
        'content/afishabg',
        'content/afisha/bg',
      );
    }
    return {
      id: film.id,
      title: film.title,
      director: film.director,
      rating: film.rating,
      tags: film.tags,
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
          }))
        : [],
    };
  }
}
