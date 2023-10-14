import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ContributionEntity } from './contribution.entity';
import { GroupService } from '../group/group.service';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupEntity } from '../group/group.entity';
import { GroupMembersEntity } from '../group-members/group-members.entity';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { ContributionTermEntity } from '../contribution-term/contribution-term.entity';
import { ContributionTermService } from '../contribution-term/contribution-term.service';
import { LogEntity } from '../logs/logs.entity';
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../user/users.entity';
import { VerificationEntity } from '../otp/otp.entity';
import { GroupInfoService } from '../group-info/group-info.service';
import { GroupInfoEntity } from '../group-info/grouup-interests.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ContributionEntity,
      GroupEntity,
      GroupMembersEntity,
      ContributionTermEntity,
      LogEntity,
      UserEntity,
      VerificationEntity,
      GroupInfoEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [ContributionController],
  providers: [
    ContributionService,
    GroupService,
    GroupMembersService,
    ContributionTermService,
    LogsService,
    UserService,
    otpService,
    AuthService,
    GroupInfoService
  ],
})
export class ContributionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ContributionController);
  }
}
