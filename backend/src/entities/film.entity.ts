import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity()
export class Film {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsNumber()
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column('text', { array: true, nullable: true, default: '{}' })
  @IsString({ each: true })
  tags: string[];

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  about: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film, { lazy: true })
  schedule: Promise<Schedule[]>;
}
