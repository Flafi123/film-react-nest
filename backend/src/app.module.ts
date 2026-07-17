import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/films.repository';
import { OrdersRepository } from './repository/orders.repository';

import { FilmEntity } from './repository/film.entity';
import { OrderEntity } from './repository/order.entity';
import { ScheduleEntity } from './repository/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rawUrl =
          configService.get<string>('DATABASE_URL') ||
          'postgres://localhost:5432/project_db';
        const username =
          configService.get<string>('DATABASE_USERNAME') || 'project_user';
        const password =
          configService.get<string>('DATABASE_PASSWORD') || 'user_password';

        const cleanUrl = rawUrl.replace('postgres://', '');

        return {
          type: 'postgres',
          url: `postgres://${username}:${password}@${cleanUrl}`,
          entities: [FilmEntity, OrderEntity, ScheduleEntity],
          synchronize: true, // Таблицы пересоздадутся автоматически
        };
      },
    }),

    TypeOrmModule.forFeature([FilmEntity, OrderEntity, ScheduleEntity]),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    FilmsRepository,
    OrdersRepository,
  ],
})
export class AppModule {}
