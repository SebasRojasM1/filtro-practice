/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { SaleEntity } from '../entities/sale.entity';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { PaginationDto } from 'src/libs/pagination/pagination.dto';

@Injectable()
export class SalesService {
  constructor(@InjectRepository(SaleEntity) private salesRepository: Repository<SaleEntity>,
              @InjectRepository(BookEntity) private booksRepository: Repository<BookEntity>, ) {}

  async createSale(createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    const book = await this.booksRepository.findOne({ 
      where: { id: createSaleDto.book_Id } 
    });

    const sale = this.salesRepository.create({
        ...createSaleDto,
        book,
    });

    return this.salesRepository.save(sale);
  }
  

  async findBySearch({ limit, order, page, search, sortBy = 'saleDate' }: PaginationDto) {
    const [results, total] = await this.salesRepository.findAndCount({
      where: [
        { customerName: ILike(`%${search}%`) },
        { customerEmail: ILike(`%${search}%`) },
        { book: { title: ILike(`%${search}%`) } },
      ],
      order: { 
        [sortBy]: order,
      },
      relations: ['book'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      dataFound: total,
      results,
    };
    /*http://localhost:3000/sales/search?search=Sebasrojasm1@gmail.com&sortBy=saleDate&order=ASC&page=1&limit=10 */
  }

  async findAllSales(): Promise<SaleEntity[]> {
    const sales =  await this.salesRepository.find(
      { relations: ['book'] }
    );

    if (!sales || sales.length === 0) {
      throw new HttpException('Sales not found. Try again.', HttpStatus.NOT_FOUND);
    }

    return sales
  }

  async findOne(id: number) {
    const sale = this.salesRepository.findOne(
      { where: { id }, 
      relations: ['book'] }
    );

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return sale
  }


  async updateSale(id: number, updateSaleDto: UpdateSaleDto) {
    await this.salesRepository.update(id, updateSaleDto);
    
    const updateSale = await this.salesRepository.findOne(
      { where: { id } }
    );
    
    if (!updateSale) {
      throw new HttpException(`The sale with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return updateSale;
  }


  async deleteSale(id: number) {
    const sale = await this.salesRepository.findOne({ where: { id } });
    
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }

    return await this.salesRepository.softDelete(id);
  }
}
