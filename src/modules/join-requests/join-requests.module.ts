import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JoinRequestsController } from './join-requests.controller';
import { JoinRequestsService } from './join-requests.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JoinRequestsEntity } from './join-request.entity';
import { JoinCodesService } from '../join-codes/join-codes.service';
import { JoinCodesEntity } from '../join-codes/join-codes.entity';
import { GroupService } from '../group/group.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupMembersEntity } from '../group-members/group-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JoinRequestsEntity,
      JoinCodesEntity,
      GroupEntity,
      GroupMembersEntity,
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [JoinRequestsController],
  providers: [
    JoinRequestsService,
    JoinCodesService,
    GroupService,
    GroupMembersService,
  ],
})
export class JoinRequestsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(JoinRequestsController);
  }
}
