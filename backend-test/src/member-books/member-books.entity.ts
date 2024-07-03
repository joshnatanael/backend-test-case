import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/books/books.entity';
import { Member } from 'src/members/members.entity';

@Table
export class MemberBook extends Model {
  @ForeignKey(() => Member)
  @Column({
    allowNull: false,
  })
  memberCode: string;

  @ForeignKey(() => Book)
  @Column({
    allowNull: false,
  })
  bookCode: string;

  @BelongsTo(() => Member)
  member?: Member;

  @BelongsTo(() => Book)
  book?: Book;
}
