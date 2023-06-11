import { Module } from '@nestjs/common';
import { GroupInterestsService } from './group-interests.service';
import { GroupInterestsController } from './group-interests.controller';

@Module({
  providers: [GroupInterestsService],
  controllers: [GroupInterestsController]
})
export class GroupInterestsModule {}
