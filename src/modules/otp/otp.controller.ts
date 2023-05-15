import { Body, Controller, Post, Request } from '@nestjs/common';
import { codeDTO } from './dto/otp.dto';
import { otpService as VerificationService } from './otp.service';

@Controller('verify')
export class otpController {
  constructor(private readonly verificationService: VerificationService) {}
}
