import { DataTypes } from 'sequelize';
import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { MemberBook } from 'src/modules/member-books/member-books.entity';

@Table
export class Member extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
  })
  code: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
  })
  penalized: string;

  @HasMany(() => MemberBook)
  memberBooks?: MemberBook[];
}
