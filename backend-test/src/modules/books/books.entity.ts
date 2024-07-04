import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { MemberBook } from 'src/modules/member-books/member-books.entity';

@Table
export class Book extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
  })
  code: string;

  @Column({
    allowNull: false,
  })
  title: string;

  @Column({
    allowNull: false,
  })
  author: string;

  @Column({
    allowNull: false,
  })
  stock: number;

  @HasMany(() => MemberBook)
  memberBooks?: MemberBook[];
}
