import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { GroupMetadataController } from './group-metadata.controller';
import { GroupMetadataService } from './group-metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMetadataEntity } from './group-metadata.entity';
import { GroupService } from '../group/group.service';
import { GroupEntity } from '../group/group.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AdminMiddleware } from 'src/common/middlewares/admin.middleware';
import { GroupMembersEntity } from '../group-members/group-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupMetadataEntity, GroupEntity, GroupMembersEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [GroupMetadataController],
  providers: [GroupMetadataService, GroupService],
})
export class GroupMetadataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(GroupMetadataController)
      .apply(AdminMiddleware)
      .forRoutes({ path: '**/group-metadata/', method: RequestMethod.GET });
  }
}
