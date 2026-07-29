import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';
import { fixtures } from './films.fixtures';
import { NotFoundException } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let repository: FilmsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .useMocker((token) => {
        if (token === FilmsRepository) {
          return {
            findAll: jest.fn().mockResolvedValue([fixtures.mockFilmEntity]),
            findById: jest.fn().mockResolvedValue(fixtures.mockFilmEntity),
          };
        }
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    repository = module.get<FilmsRepository>(FilmsRepository);
  });

  it('должен быть определен', () => {
    expect(controller).toBeDefined();
  });

  describe('getFilms', () => {
    it('должен вернуть список фильмов в формате { items, total }', async () => {
      const result = await controller.getFilms();

      expect(repository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        items: [fixtures.expectedFilmDto],
        total: 1,
      });
    });
  });

  describe('getSchedule', () => {
    it('должен вернуть расписание сессий фильма в формате { items, total }', async () => {
      const result = await controller.getSchedule('film-123');

      expect(repository.findById).toHaveBeenCalledWith('film-123');
      expect(result).toEqual({
        items: fixtures.expectedSessions,
        total: fixtures.expectedSessions.length,
      });
    });

    it('должен пробрасывать NotFoundException, если сервис не нашел фильм', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(controller.getSchedule('unknown-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});