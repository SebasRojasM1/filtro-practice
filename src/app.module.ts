import { Module } from '@nestjs/common';
import { SalesService } from './modules/sales/services/sales.service';
import { BooksService } from './modules/books/services/books.service';
import { AuthorEntity } from './modules/author/entities/author.entity';
import { AuthorController } from './modules/author/controllers/author.controller';
import { SalesController } from './modules/sales/controllers/sales.controller';
import { BooksController } from './modules/books/controllers/books.controller';
import { AuthorService } from './modules/author/services/author.service';
import { SaleEntity } from './modules/sales/entities/sale.entity';
import { BookEntity } from './modules/books/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [AuthorEntity, BookEntity, SaleEntity],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity]), // Register your entities
  ],
  controllers: [AuthorController, SalesController, BooksController],
  providers: [AuthorService, SalesService, BooksService],
})
export class AppModule {}