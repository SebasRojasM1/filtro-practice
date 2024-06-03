import { IsOptional, IsString, IsInt, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';

  @IsOptional()
  @IsNumber()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  limit?: number;
}