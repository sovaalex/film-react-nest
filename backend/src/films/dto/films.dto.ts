import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ScheduleDto } from './shedule.dto';
import { Type } from 'class-transformer';

export class FilmDto {
  @IsString()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ScheduleDto)
  items?: ScheduleDto[];
}
