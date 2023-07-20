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
import { LogsService } from '../logs/logs.service';
import { UserService } from '../user/user.service';
import { otpService } from '../otp/otp.service';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../user/users.entity';
import { VerificationEntity } from '../otp/otp.entity';
import { LogEntity } from '../logs/logs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LoanEntity,
      GroupEntity,
      GroupMembersEntity,
      UserEntity, 
      VerificationEntity,
      LogEntity
    ]),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [LoanController],
  providers: [LoanService, GroupService, GroupMembersService, LogsService, UserService,
  otpService, AuthService
   ],
})
export class LoanModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LoanController);
  }
}