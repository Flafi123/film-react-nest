import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilmEntity } from './film.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async findAll(): Promise<FilmEntity[]> {
    return this.filmRepository.find();
  }

  async findById(id: string): Promise<FilmEntity | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: {
        schedule: true,
      },
    });
  }

  async save(film: FilmEntity): Promise<FilmEntity> {
    return this.filmRepository.save(film);
  }
}
