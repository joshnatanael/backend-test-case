import { Inject, Injectable } from '@nestjs/common';
import { Member } from './members.entity';
import { MemberBook } from 'src/member-books/member-books.entity';
import sequelize from 'sequelize';

@Injectable()
export class MembersService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private readonly membersRepository: typeof Member,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.membersRepository.findAll<Member>({
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('MemberBooks.id')),
            'borrowedBook',
          ],
        ],
        exclude: ['createdAt', 'updatedAt', 'penalized'],
      },
      include: [
        {
          model: MemberBook,
          attributes: [],
        },
      ],
      group: ['code'],
    });
  }

  async findOne(memberCode: string): Promise<Member> {
    return this.membersRepository.findOne<Member>({
      where: {
        code: memberCode,
      },
      attributes: {
        include: [
          [
            sequelize.fn('COUNT', sequelize.col('MemberBooks.id')),
            'borrowedBook',
          ],
        ],
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: MemberBook,
          attributes: [],
        },
      ],
      group: ['code'],
    });
  }
}
