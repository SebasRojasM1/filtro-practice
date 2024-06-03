import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@ApiTags("Author")
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post("/create")
  create(@Body(new ValidationPipe()) createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get("/all")
  findAll() {
    return this.authorService.findAllAuthors();
  }

  @Get("/search")
  findBySearch(@Query(new ValidationPipe()) pagination: PaginationDto) {
    return this.authorService.findBySearch(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.authorService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body(new ValidationPipe()) updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.updateAuthor(+id, updateAuthorDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.authorService.deleteAuthor(+id);
  }
}
