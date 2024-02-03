import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { otpService } from '../otp/otp.service';
import { VerificationEntity } from '../otp/otp.entity';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LoginAttemptsService } from '../login-attempts/login-attempts.service';
import { LoginAttemptEntity } from '../login-attempts/login-attempts.entity';
import { GroupMembersService } from '../group-members/group-members.service';
import { GroupMembersEntity } from '../group-members/group-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      GroupMembersEntity,
      VerificationEntity,
      LoginAttemptEntity,
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  providers: [UserService, otpService, AuthService, LoginAttemptsService],
  controllers: [UserController],
})
export class UserModule {}
