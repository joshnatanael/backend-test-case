import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { booksProviders } from './books.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BooksController],
  providers: [BooksService, ...booksProviders],
  exports: [BooksService],
})
export class BooksModule {}
