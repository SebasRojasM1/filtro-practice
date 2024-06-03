import { Injectable } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto';
import { AuthorEntity } from '../entities/author.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) {}

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  findAllAuthors(): Promise<AuthorEntity[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findBySearch({ limit, order, page, search, sortBy = 'name' }: PaginationDto) {
    const [results, total] = await this.authorsRepository.findAndCount({
      where: {
        name: ILike(`%${search}%`),
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
      results,
    };
    /*http://localhost:3000/author/search?search=Stephen%20King&sortBy=name&order=ASC&page=1&limit=1 */
  }

  findOne(id: number): Promise<AuthorEntity> {
    return this.authorsRepository.findOne({ where: { id }, relations: ['books'] });
  }



  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<AuthorEntity> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async deleteAuthor(id: number): Promise<void> {
    await this.authorsRepository.softDelete(id);
  }
}
