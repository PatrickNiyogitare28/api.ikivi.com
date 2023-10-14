import { Module } from '@nestjs/common';
import { GroupInfoService } from './group-info.service';
import { GroupInfoController } from './group-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupInfoEntity } from './grouup-interests.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupInfoEntity
    ])
  ],
  providers: [GroupInfoService],
  controllers: [GroupInfoController],
})
export class GroupInfoModule {}
