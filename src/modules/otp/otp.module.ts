import { Module } from '@nestjs/common';
import { otpService } from './otp.service';
import { otpController } from './otp.controller';
import { VerificationEntity } from './otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationEntity])],
  providers: [otpService],
  controllers: [otpController],
})
export class OtpModule {}
