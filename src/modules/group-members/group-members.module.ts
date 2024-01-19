import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupMembersController } from './group-members.controller';
import { GroupMembersService } from './group-members.service';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { GroupMembersEntity } from './group-members.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { GroupService } from '../group/group.service';
import { GroupEntity } from '../group/group.entity';
import { LogEntity } from '../logs/logs.entity';
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
      GroupMembersEntity,
      GroupEntity,
      LogEntity,
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
  controllers: [GroupMembersController],
  providers: [
    GroupMembersService,
    GroupService,
    LogsService,
    UserService,
    otpService,
    AuthService,
    NotificationsService,
    LoginAttemptsService,
  ],
})
export class GroupMembersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GroupMembersController);
  }
}
