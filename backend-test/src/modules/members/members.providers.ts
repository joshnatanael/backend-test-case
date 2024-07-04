import { Member } from './members.entity';

export const membersProviders = [
  {
    provide: 'MEMBERS_REPOSITORY',
    useValue: Member,
  },
];
