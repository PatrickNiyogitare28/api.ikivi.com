import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { PeriodicEarnEntity } from './periodic-earn.entity';
import { PeriodicEarnController } from './periodic-earn.controller';
import { PeriodicEarnService } from './periodic-earn.service';
import { LogEntity } from '../logs/logs.entity';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../user/users.entity';
import { VerificationEntity } from '../otp/otp.entity';
import { GroupInfoService } from '../group-info/group-info.service';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';
import { NotificationEntity } from '../notifications/notifications.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { LoginAttemptsService } from '../login-attempts/login-attempts.service';
import { LoginAttemptEntity } from '../login-attempts/login-attempts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PeriodicEarnEntity,
      GroupEntity,
      GroupMembersEntity,
      ContributionTermEntity,
      LogEntity,
      UserEntity,
      VerificationEntity,
      GroupInfoEntity,
      NotificationEntity,
      LoginAttemptEntity,
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [PeriodicEarnController],
  providers: [
    PeriodicEarnService,
    GroupService,
    GroupMembersService,
    ContributionTermService,
    LogsService,
    UserService,
    otpService,
    AuthService,
    GroupInfoService,
    NotificationsService,
    LoginAttemptsService,
  ],
})
export class PeriodicEarnModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PeriodicEarnController);
  }
}
