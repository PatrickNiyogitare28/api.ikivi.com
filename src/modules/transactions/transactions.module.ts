/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ContributionService } from '../contribution/contribution.service';
import { PeriodicEarnService } from '../periodic-earn/periodic-earn.service';
import { LoanService } from '../loan/loan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ContributionEntity } from '../contribution/contribution.entity';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { GroupInfoService } from '../group-info/group-info.service';
import { PeriodicEarnEntity } from '../periodic-earn/periodic-earn.entity';
import { LoanEntity } from '../loan/loan.entity';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { LogEntity } from '../logs/logs.entity';
import { UserEntity } from '../user/users.entity';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';
import { VerificationEntity } from '../otp/otp.entity';
import { AdminMiddleware } from 'src/common/middlewares/admin.middleware';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { LoanRequestsService } from '../loan-requests/loan-requests.service';
import { LoanRequestsEntity } from '../loan-requests/loan-requests.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContributionEntity,
      PeriodicEarnEntity,
      LoanEntity,
      GroupEntity,
      GroupMembersEntity,
      ContributionTermEntity,
      LogEntity,
      UserEntity,
      GroupInfoEntity,
      VerificationEntity,
      LoanRequestsEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [
    TransactionsService,
    ContributionService,
    PeriodicEarnService,
    LoanService,
    GroupService,
    GroupMembersService,
    ContributionTermService,
    LogsService,
    UserService,
    GroupInfoService,
    otpService,
    AuthService,
    LoanRequestsService
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TransactionsController)
      .apply(AdminMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.PATCH });
  }
}
