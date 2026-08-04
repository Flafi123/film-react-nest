import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FilmsRepository } from './repository/films.repository';
import { DataSource } from 'typeorm';
import { TskvLogger } from './logger/tskv.logger';

import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(new TskvLogger());

  const filmsRepository = app.get(FilmsRepository);
  const existingFilms = await filmsRepository.findAll();

  if (existingFilms.length === 0) {
    console.log(
      'База данных PostgreSQL пуста. Инициализируем данные из SQL-файлов...',
    );
    try {
      const dataSource = app.get(DataSource);
      const testFolder = path.resolve(process.cwd(), 'test');

      const initSql = fs.readFileSync(
        path.join(testFolder, 'prac.init.sql'),
        'utf8',
      );
      const filmsSql = fs.readFileSync(
        path.join(testFolder, 'prac.films.sql'),
        'utf8',
      );
      const schedulesSql = fs.readFileSync(
        path.join(testFolder, 'prac.shedules.sql'),
        'utf8',
      );

      await dataSource.query(initSql);
      await dataSource.query(filmsSql);
      await dataSource.query(schedulesSql);

      console.log('Инициализация СУБД PostgreSQL успешно завершена!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error('Ошибка при выполнении SQL-скриптов инициализации:', msg);
    }
  }

  await app.listen(3000);
}
bootstrap();
