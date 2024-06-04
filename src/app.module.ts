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
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [AuthorEntity, BookEntity, SaleEntity],
        autoLoadEntities: true,
        synchronize: false, // Disable synchronize for production
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        ssl: { rejectUnauthorized: false } // Add this line
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity]), // Register your entities
  ],
  controllers: [AuthorController, SalesController, BooksController],
  providers: [AuthorService, SalesService, BooksService],
})
export class AppModule {}