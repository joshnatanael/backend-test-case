import { Controller, Get } from '@nestjs/common';
import { MembersService } from './members.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('')
  @ApiResponse({
    status: 200,
    description: 'Successfully fetching members data',
    example: [
      {
        code: 'M001',
        name: 'Angga',
        borrowedBook: 0,
      },
      {
        code: 'M002',
        name: 'Ferry',
        borrowedBook: 1,
      },
      {
        code: 'M003',
        name: 'Putri',
        borrowedBook: 0,
      },
    ],
  })
  getAll() {
    const members = this.membersService.findAll();

    return members;
  }
}
