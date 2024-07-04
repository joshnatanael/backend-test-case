import { Test } from '@nestjs/testing';
import { MembersService } from './members.service';

const members = [
  [
    {
      code: 'M001',
      name: 'Angga',
      borrowedBook: 0,
    },
    {
      code: 'M002',
      name: 'Ferry',
      borrowedBook: 0,
    },
    {
      code: 'M003',
      name: 'Putri',
      borrowedBook: 0,
    },
  ],
];

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const fakeMembersRepository = {
      findAll: () => Promise.resolve(members),
    };

    const module = await Test.createTestingModule({
      providers: [
        MembersService,
        {
          provide: 'MEMBERS_REPOSITORY',
          useValue: fakeMembersRepository,
        },
      ],
    }).compile();

    service = module.get(MembersService);
  });

  it('can create and instance of member service', async () => {
    expect(service).toBeDefined();
  });

  it('return all member data', async () => {
    const queriedMembers = await service.findAll();

    expect(queriedMembers).toEqual(members);
  });
});
