import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContributionTermService } from './contribution-term.service';
import { ContributionTermController } from './contribution-term.controller';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../group/group.entity';
import { JwtModule } from '@nestjs/jwt';
import { ContributionTermEntity } from './contribution-term.entity';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { LogEntity } from '../logs/logs.entity';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/users.entity';
import { otpService } from '../otp/otp.service';
import { VerificationEntity } from '../otp/otp.entity';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContributionTermEntity,
      GroupEntity,
      GroupMembersEntity,
      LogEntity,
      UserEntity,
      VerificationEntity,
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [
    ContributionTermService,
    GroupService,
    GroupMembersService,
    LogsService,
    UserService,
    otpService,
    AuthService,
  ],
  controllers: [ContributionTermController],
})
export class ContributionTermModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ContributionTermController);
  }
}
