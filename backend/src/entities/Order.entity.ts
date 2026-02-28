import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';

@Entity()
export class Order {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  film: string;

  @Column()
  @IsString()
  session: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  row: number;

  @Column()
  @IsNumber()
  seat: number;

  @Column()
  @IsNumber()
  price: number;
}
