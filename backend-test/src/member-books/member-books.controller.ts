import { Body, Controller, Post } from '@nestjs/common';
import { MemberBooksService } from './member-books.service';
import { BorrowBookBodyDto } from './dto/borrow-book.dto';
import { ReturnBookBodyDto } from './dto/return-book.dto';

@Controller('member-books')
export class MemberBooksController {
  constructor(private readonly memberBooksService: MemberBooksService) {}

  @Post('/borrow')
  borrowBook(@Body() body: BorrowBookBodyDto) {
    const book = this.memberBooksService.borrow(body.bookCode, body.memberCode);

    return book;
  }

  @Post('/return')
  async returnBook(@Body() body: ReturnBookBodyDto) {
    const status = await this.memberBooksService.return(
      body.bookCode,
      body.memberCode,
    );

    return { message: status };
  }
}
