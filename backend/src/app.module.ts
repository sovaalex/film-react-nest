import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Film } from './entities/film.entity';
import { Order } from './entities/order.entity';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: 'film_project',
        entities: [Schedule, Film, Order],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(path.dirname(__dirname), 'public', 'content'),
      serveRoot: '/content/',
    }),
    FilmsModule,
    OrderModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
