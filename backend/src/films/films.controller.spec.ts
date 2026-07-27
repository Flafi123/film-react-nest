import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { fixtures } from './films.fixtures';
import { FilmsRepository } from '../repository/films.repository'

describe('FilmsController', () => {
  let filmController: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    }).useMocker((token) => {
        if (token === FilmsRepository) {
          return {
            films: {
              findAll: jest.fn().mockResolvedValue(fixtures.film),
              findSchedule: jest.fn().mockResolvedValue(fixtures.schedule),
            }
          };
        }
        throw new Error(`Token ${token.toString()} not found`);
      }
    ).compile();

    filmController = module.get<FilmsController>(FilmsController);
  });


    it('должен вызвать метод getFilms', async () => {
      expect(filmController).toBeDefined();
      const getFilmsResult = await filmController.getFilms();
      expect(getFilmsResult).toEqual(fixtures.film);
    });

    it('должен вызвать метод getSchedule', async () => {
      expect(filmController).toBeDefined();
      const getScheduleResult = await filmController.getSchedule('1');
      expect(getScheduleResult).toEqual(fixtures.schedule);
    });
  });
