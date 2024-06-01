import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JoinCodesController } from './join-codes.controller';
import { JoinCodesService } from './join-codes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinCodesEntity } from './join-codes.entity';
import { GroupEntity } from '../group/group.entity';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { GroupMembersEntity } from '../group-members/group-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
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
  controllers: [JoinCodesController],
  providers: [JoinCodesService, GroupService],
})
export class JoinCodesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(JoinCodesController);
  }
}
