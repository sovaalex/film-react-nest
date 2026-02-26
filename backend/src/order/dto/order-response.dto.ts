import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';
import { Type } from 'class-transformer';

export class OrderItemResponseDto extends CreateOrderDto {
  @IsString()
  id: string;
}

export class OrderResponseDto {
  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}
