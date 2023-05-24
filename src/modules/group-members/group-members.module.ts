import { Module } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { GroupMembersService } from './group-members.service';

@Module({
  controllers: [GroupMembersController],
  providers: [GroupMembersService],
})
export class GroupMembersModule {}
