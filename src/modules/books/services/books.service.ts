/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { BookEntity } from '../entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
  ) {}
  
  async createBook(createBook: CreateBookDto) {
    const addBook = this.bookRepository.create(createBook);

    const existBook = await this.bookRepository.findOneBy({
      title: createBook.title,
    });

    if (existBook) {
      throw new HttpException('Book already exist. Try again.', HttpStatus.BAD_REQUEST);
    }

    return this.bookRepository.save(addBook);
  }

  async findAllBooks() {
    const books = await this.bookRepository.find({ relations: ['author'] });

    if (!books || books.length === 0) {
      throw new HttpException('Books not found. Try again.', HttpStatus.NOT_FOUND);
    }

    return books;
  }

  async findBySearch({ limit, order, page, search, sortBy = 'title' }: PaginationDto) {
    const [results, total] = await this.bookRepository.findAndCount({
      where: {
        title: ILike(`%${search}%`),
      },
      order: {
        [sortBy]: order,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      dataFound: total,
      results
    }
    /*http://localhost:3000/books/search?search=fantasía&sortBy=title&order=ASC&page=1&limit=10 */
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new HttpException(
        `The book with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    await this.bookRepository.update(id, updateBookDto);
    
    const updatedBook = await this.bookRepository.findOne({ where: { id } });
    
    if (!updatedBook) {
      throw new HttpException(`The book with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return updatedBook;
  }

  async deleteBook(id: number) {
    const book = await this.findOne(id);

    if (!book) {
      throw new HttpException(`The book with ID ${id} it´s not found`, HttpStatus.NOT_FOUND);
    }

    return await this.bookRepository.softDelete(book);;
  }
}
