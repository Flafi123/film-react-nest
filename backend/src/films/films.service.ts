import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmMapper } from '../repository/film.mapper';
import { FilmResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmResponseDto[]> {
    const films = await this.filmsRepository.findAll();
    return films.map((film) => FilmMapper.toResponseDto(film));
  }

  async findSchedule(id: string): Promise<ScheduleResponseDto> {
    const film = await this.filmsRepository.findById(id);
    if (!film) {
      throw new NotFoundException(`Фильм с идентификатором ${id} не найден`);
    }
    return FilmMapper.toScheduleDto(film);
  }
}
