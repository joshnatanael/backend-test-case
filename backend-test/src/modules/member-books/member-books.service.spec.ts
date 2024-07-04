import { Test, TestingModule } from '@nestjs/testing';
import { MemberBooksService } from './member-books.service';
import { BooksService } from '../books/books.service';
import { MembersService } from '../members/members.service';
import sequelizeConfig from 'src/config/sequelize-config';
import { SequelizeModule } from '@nestjs/sequelize';

describe('MemberBooksService', () => {
  let service: MemberBooksService;

  beforeEach(async () => {
    const fakeMemberBooksRepository = {
      create: () =>
        Promise.resolve({
          userCode: 'M001',
          bookCode: 'JK-45',
          createdAt: '2024-07-03T13:25:58.000Z',
          updatedAt: '2024-07-04T03:56:23.809Z',
        }),
      findOne: () =>
        Promise.resolve({
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 0,
          createdAt: '2024-07-03T13:25:58.000Z',
          updatedAt: '2024-07-04T03:56:23.809Z',
          destroy: jest.fn(),
        }),
    };
    const fakeBooksService = {
      findOne: () =>
        Promise.resolve({
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
          set: jest.fn(),
          save: jest.fn(),
        }),
    };
    const fakeMembersService = {
      findOne: () =>
        Promise.resolve({
          code: 'M001',
          name: 'Angga',
          borrowedBook: 0,
          getDataValue: jest.fn().mockReturnValue(0),
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberBooksService,
        {
          provide: 'MEMBERBOOKS_REPOSITORY',
          useValue: fakeMemberBooksRepository,
        },
        {
          provide: BooksService,
          useValue: fakeBooksService,
        },
        {
          provide: MembersService,
          useValue: fakeMembersService,
        },
      ],
      imports: [
        SequelizeModule.forRoot({
          ...sequelizeConfig,
        }),
      ],
    }).compile();

    service = module.get<MemberBooksService>(MemberBooksService);
  });

  it('can create and instance of member-books service', () => {
    expect(service).toBeDefined();
  });
  it('can borrow book', async () => {
    const book = await service.borrow('JK-45', 'M001');

    book.stock = book.stock - 1;

    expect(book.code).toEqual('JK-45');
    expect(book.title).toEqual('Harry Potter');
    expect(book.author).toEqual('J.K Rowling');
    expect(book.stock).toEqual(0);
  });
  it('can return book', async () => {
    const result = await service.return('JK-45', 'M001');

    expect(result).toEqual('Success');
  });
});
