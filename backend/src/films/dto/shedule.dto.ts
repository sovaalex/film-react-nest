import { IsString, IsNumber, IsArray, IsDateString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  id: string;

  @IsDateString()
  daytime: Date;

  @IsNumber()
  hall: number;

  @IsNumber()
  rows: number;

  @IsNumber()
  seats: number;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString()
  taken: string[];
}
