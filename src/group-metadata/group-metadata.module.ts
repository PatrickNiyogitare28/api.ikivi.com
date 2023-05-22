import { Module } from '@nestjs/common';
import { GroupMetadataController } from './group-metadata.controller';
import { GroupMetadataService } from './group-metadata.service';

@Module({
  controllers: [GroupMetadataController],
  providers: [GroupMetadataService]
})
export class GroupMetadataModule {}
