import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';

const books = [
  {
    code: 'JK-45',
    title: 'Harry Potter',
    author: 'J.K Rowling',
    stock: 1,
  },
  {
    code: 'SHR-1',
    title: 'A Study in Scarlet',
    author: 'Arthur Conan Doyle',
    stock: 1,
  },
  {
    code: 'TW-11',
    title: 'Twilight',
    author: 'Stephenie Meyer',
    stock: 1,
  },
  {
    code: 'HOB-83',
    title: 'The Hobbit, or There and Back Again',
    author: 'J.R.R. Tolkien',
    stock: 1,
  },
  {
    code: 'NRN-7',
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    stock: 1,
  },
];

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const fakeBooksRepository = {
      findAll: () => Promise.resolve(books),
    };

    const module = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: 'BOOKS_REPOSITORY',
          useValue: fakeBooksRepository,
        },
      ],
    }).compile();

    service = module.get(BooksService);
  });

  it('can create and instance of book service', async () => {
    expect(service).toBeDefined();
  });

  it('return all book data', async () => {
    const queriedBooks = await service.findAll();

    expect(queriedBooks).toEqual(books);
  });
  it('return all available book only', async () => {
    const queriedBooks = await service.findAll();
    queriedBooks.forEach((book) => {
      expect(book.stock).toBeGreaterThan(0);
    });
  });
});
