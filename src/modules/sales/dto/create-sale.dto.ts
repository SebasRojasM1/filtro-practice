/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  customerName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  customerEmail: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  book_Id: number;
}
