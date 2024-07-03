import { Inject, Injectable } from '@nestjs/common';
import { Book } from './books.entity';
import { Attributes, FindOptions, Op } from 'sequelize';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private readonly booksRepository: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.findAll<Book>({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        [Op.not]: {
          stock: 0,
        },
      },
    });
  }

  async findOne(options: FindOptions<Attributes<Book>>): Promise<Book> {
    return this.booksRepository.findOne({ ...options });
  }
}
