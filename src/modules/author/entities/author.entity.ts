import { BookEntity } from 'src/modules/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Author')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
