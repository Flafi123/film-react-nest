import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/films.repository';
import { OrdersRepository } from './repository/orders.repository';
import { FilmSchema } from './repository/film.schema';
import { OrderSchema } from './repository/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('DATABASE_URL') ||
          'mongodb://localhost:27017/afisha_db',
      }),
    }),

    MongooseModule.forFeature([
      { name: 'Film', schema: FilmSchema },
      { name: 'Order', schema: OrderSchema },
    ]),

    ServeStaticModule.forRoot({
      // Нацеливаем rootPath прямо на папку afisha
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      // Привязываем её к URL /content/afisha
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
