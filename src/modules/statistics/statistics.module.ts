import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { ContributionService } from '../contribution/contribution.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { ContributionEntity } from '../contribution/contribution.entity';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { LogEntity } from '../logs/logs.entity';
import { UserEntity } from '../user/users.entity';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { VerificationEntity } from '../otp/otp.entity';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { GroupInfoService } from '../group-info/group-info.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationEntity } from '../notifications/notifications.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupEntity,
      ContributionEntity,
      GroupMembersEntity,
      ContributionTermEntity,
      LogEntity,
      UserEntity,
      VerificationEntity,
      GroupInfoEntity,
      NotificationEntity,
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [StatisticsController],
  providers: [
    StatisticsService,
    GroupService,
    ContributionService,
    GroupMembersService,
    ContributionTermService,
    LogsService,
    UserService,
    otpService,
    AuthService,
    GroupInfoService,
    NotificationsService,
  ],
})
export class StatisticsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(StatisticsController);
  }
}
