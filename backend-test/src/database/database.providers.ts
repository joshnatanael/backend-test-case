import { Sequelize } from 'sequelize-typescript';
import { Member } from 'src/members/members.entity';
import { Book } from 'src/books/books.entity';
import { MemberBook } from 'src/member-books/member-books.entity';
import sequelizeConfig from 'src/config/sequelize-config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([Member, Book, MemberBook]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
