import {
  NotFoundException,
  Inject,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { MemberBook } from './member-books.entity';
import { BooksService } from 'src/modules/books/books.service';
import { Op } from 'sequelize';
import { MembersService } from 'src/modules/members/members.service';
import * as dayjs from 'dayjs';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MemberBooksService {
  constructor(
    @Inject('MEMBERBOOKS_REPOSITORY')
    private readonly memberBooksRepository: typeof MemberBook,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
    private sequelize: Sequelize,
  ) {}

  async borrow(bookCode: string, memberCode: string) {
    try {
      const member = await this.membersService.findOne(memberCode);

      if (member.getDataValue('borrowedBook') >= 2) {
        throw new ForbiddenException({
          code: 'Forbidden',
          message: 'Members may not borrow more than 2 books',
        });
      }

      if (!!member.penalized) {
        const penaltyTimeElapsed = dayjs(new Date()).diff(
          member.penalized,
          'day',
        );

        if (penaltyTimeElapsed <= 3) {
          throw new ForbiddenException({
            code: 'Forbidden',
            message: 'Member is currently being penalized',
          });
        }

        member.set({ penalized: null });
        await member.save();
      }

      const book = await this.booksService.findOne({
        where: {
          code: bookCode,
          [Op.not]: {
            stock: 0,
          },
        },
      });

      if (!book) {
        throw new NotFoundException({
          code: 'NotFound',
          message: 'Books not found',
        });
      }

      return this.sequelize.transaction(async (t) => {
        book.set({ stock: book.stock - 1 });
        await book.save({ transaction: t });

        await this.memberBooksRepository.create(
          {
            memberCode,
            bookCode,
          },
          { transaction: t },
        );

        return book;
      });
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async return(bookCode: string, memberCode: string) {
    try {
      let status = 'Success';

      const borrowData = await this.memberBooksRepository.findOne({
        where: {
          bookCode,
          memberCode,
        },
      });

      if (!borrowData) {
        throw new NotFoundException({
          code: 'NotFound',
          message: 'Data not found',
        });
      }

      const borrowingPeriod = dayjs(new Date()).diff(
        borrowData.createdAt,
        'day',
      );

      return this.sequelize.transaction(async (t) => {
        if (borrowingPeriod > 7) {
          const member = await this.membersService.findOne(memberCode);

          member.set({ penalized: new Date() });

          status =
            'The book is returned after more than 7 days, You are getting penalty';

          await member.save({ transaction: t });
        }

        borrowData.destroy({ transaction: t });

        const book = await this.booksService.findOne({
          where: {
            code: bookCode,
          },
        });

        book.set({ stock: book.stock + 1 });
        await book.save({ transaction: t });

        return status;
      });
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
