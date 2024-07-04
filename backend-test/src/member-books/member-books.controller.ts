import { Body, Controller, Post } from '@nestjs/common';
import { MemberBooksService } from './member-books.service';
import { BorrowBookBodyDto } from './dto/borrow-book.dto';
import { ReturnBookBodyDto } from './dto/return-book.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow & Return Book')
@Controller('member-books')
export class MemberBooksController {
  constructor(private readonly memberBooksService: MemberBooksService) {}

  @Post('/borrow')
  @ApiResponse({
    status: 201,
    description: 'Successfully borrow book',
    example: {
      code: 'JK-45',
      title: 'Harry Potter',
      author: 'J.K Rowling',
      stock: 0,
      createdAt: '2024-07-03T13:25:58.000Z',
      updatedAt: '2024-07-04T03:56:23.809Z',
    },
  })
  @ApiResponse({
    status: 403,
    description:
      'Members may not borrow more than 2 books or member is currently being penalized',
    content: {
      'application/json': {
        examples: {
          NoBorrowSlot: {
            value: {
              code: 'Forbidden',
              message: 'Members may not borrow more than 2 books',
            },
          },
          Penalized: {
            value: {
              code: 'Forbidden',
              message: 'Member is currently being penalized',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Books not found',
    example: {
      code: 'NotFound',
      message: 'Books not found',
    },
  })
  borrowBook(@Body() body: BorrowBookBodyDto) {
    const book = this.memberBooksService.borrow(body.bookCode, body.memberCode);

    return book;
  }

  @Post('/return')
  @ApiResponse({
    status: 404,
    description: 'Books not found',
    example: {
      code: 'NotFound',
      message: 'Books not found',
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully return book',
    content: {
      'application/json': {
        examples: {
          Success: { value: { message: 'success' } },
          Late: {
            value: {
              message:
                'The book is returned after more than 7 days, You are getting penalty',
            },
          },
        },
      },
    },
  })
  async returnBook(@Body() body: ReturnBookBodyDto) {
    const status = await this.memberBooksService.return(
      body.bookCode,
      body.memberCode,
    );

    return { message: status };
  }
}
