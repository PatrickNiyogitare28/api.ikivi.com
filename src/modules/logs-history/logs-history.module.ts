import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LogsHistoryController } from './logs-history.controller';
import { LogsHistoryService } from './logs-history.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LogEntity } from '../logs/logs.entity';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/users.entity';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { VerificationEntity } from '../otp/otp.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationEntity } from '../notifications/notifications.entity';
import { LoginAttemptsService } from '../login-attempts/login-attempts.service';
import { LoginAttemptEntity } from '../login-attempts/login-attempts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogEntity,
      GroupEntity,
      GroupMembersEntity,
      UserEntity,
      VerificationEntity,
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
  controllers: [LogsHistoryController],
  providers: [
    LogsHistoryService,
    GroupService,
    GroupMembersService,
    LogsService,
    UserService,
    otpService,
    AuthService,
    NotificationsService,
    LoginAttemptsService,
  ],
})
export class LogsHistoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LogsHistoryController);
  }
}
