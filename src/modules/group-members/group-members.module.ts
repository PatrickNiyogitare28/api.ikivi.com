import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { GroupMembersService } from './group-members.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { GroupMembersEntity } from './group-members.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { GroupEntity } from '../group/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupMembersEntity,
      GroupEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [GroupMembersController],
  providers: [GroupMembersService, GroupService],
})
export class GroupMembersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GroupMembersController);
  }
}
