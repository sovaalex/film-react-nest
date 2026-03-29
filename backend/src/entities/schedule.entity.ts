import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsDateString, IsNumber } from 'class-validator';
import { Film } from './film.entity';

@Entity()
export class Schedule {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsDateString()
  daytime: Date;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column('text', { array: true, nullable: true, default: '{}' })
  @IsString({ each: true })
  taken: string[];

  @ManyToOne('Film', (film: Film) => film.schedule)
  @JoinColumn({ name: 'film_id' })
  film: Film;
}
