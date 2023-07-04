import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoanRequestsController } from './loan-requests.controller';
import { LoanRequestsService } from './loan-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRequestsEntity } from './loan-requests.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { JwtModule } from '@nestjs/jwt';
import { LoanEntity } from '../loan/loan.entity';
import { LoanService } from '../loan/loan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoanRequestsEntity, GroupEntity, GroupMembersEntity, LoanEntity]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [LoanRequestsController],
  providers: [LoanRequestsService, GroupService, GroupMembersService, LoanService]
})
export class LoanRequestsModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LoanRequestsController);
  }
}
