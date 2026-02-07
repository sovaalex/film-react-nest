import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

  @IsNumber()
  @Min(1)
  row: number;

  @IsNumber()
  @Min(1)
  seat: number;

  @IsNumber()
  price: number;
}
