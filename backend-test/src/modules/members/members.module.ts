import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { membersProviders } from './members.providers';
import { MembersController } from './members.controller';
import { DatabaseModule } from 'src/modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [MembersService, ...membersProviders],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
