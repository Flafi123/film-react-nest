import { FilmResponseDto, ScheduleResponseDto } from './dto/films.dto';

const film: FilmResponseDto = {
    id: '1',
    title: 'Фильм 1',
    director: 'Директор 1',
    rating: 5,
    tags: ['тег 1', 'тег 2'],
    image: 'https://example.com/image1.jpg',
    cover: 'https://example.com/cover1.jpg',
    about: 'Описание фильма 1',
    description: 'Описание фильма 1',
};

const schedule: ScheduleResponseDto = {
      filmId: '1',
      sessions:  [{
        id: '1',
        time: '10:00',
        price: 100
      }]
}

export const fixtures = {
    film,
    schedule
};

