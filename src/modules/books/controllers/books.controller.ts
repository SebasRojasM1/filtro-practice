/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/create')
  @ApiBody({ type: CreateBookDto })
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get('/all')
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Get('/searchBook')
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.booksService.findBySearch(pagination);
  }

  @Put('update/:id')
  @ApiBody({ type: CreateBookDto })
  update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBook(id);
  }
}
