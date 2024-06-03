import { AuthorEntity } from 'src/modules/author/entities/author.entity';
import { SaleEntity } from 'src/modules/sales/entities/sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @ManyToOne(() => AuthorEntity, (author) => author.books)
  @JoinColumn({ name: 'author_Id' })
  author: AuthorEntity;

  @OneToMany(() => SaleEntity, (sale) => sale.book)
  sales: SaleEntity[];

  @Column()
  author_Id: number;
}
