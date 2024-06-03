/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { BookEntity } from 'src/modules/books/entities/book.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("Sales")
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column({default: 0})
  customerEmail: string;

  @ManyToOne(() => BookEntity, (book) => book.sales)
  @JoinColumn({ name: 'book_Id' })
  book: BookEntity;

  @Column()
  book_Id: number;

  @CreateDateColumn({ type: 'timestamp' })
  saleDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude({ toPlainOnly: true }) // Excluir deletedAt solo cuando se serializa a un objeto plano
  deletedAt?: Date;
}
