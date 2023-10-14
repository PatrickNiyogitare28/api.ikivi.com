import { Module } from '@nestjs/common';
import { GroupInfoService } from './group-info.service';
import { GroupInfoController } from './group-info.controller';

@Module({
  providers: [GroupInfoService],
  controllers: [GroupInfoController],
})
export class GroupInfoModule {}
