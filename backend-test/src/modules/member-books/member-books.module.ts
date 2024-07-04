import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { MemberBooksController } from './member-books.controller';
import { MemberBooksService } from './member-books.service';
import { memberBooksProviders } from './member-books.providers';
import { BooksModule } from 'src/modules/books/books.module';
import { MembersModule } from 'src/modules/members/members.module';

@Module({
  imports: [DatabaseModule, BooksModule, MembersModule],
  controllers: [MemberBooksController],
  providers: [MemberBooksService, ...memberBooksProviders],
})
export class MemberBooksModule {}
