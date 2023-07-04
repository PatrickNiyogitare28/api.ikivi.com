import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { LoanEntity } from './loan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanEntity,
      GroupEntity,
      GroupMembersEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [LoanController],
  providers: [LoanService, GroupService, GroupMembersService],
})
export class LoanModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LoanController);
  }
}