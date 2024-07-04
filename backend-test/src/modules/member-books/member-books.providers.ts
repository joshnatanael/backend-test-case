import { MemberBook } from './member-books.entity';

export const memberBooksProviders = [
  {
    provide: 'MEMBERBOOKS_REPOSITORY',
    useValue: MemberBook,
  },
];
