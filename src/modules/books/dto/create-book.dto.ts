/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  author_Id: number;
}
