import { Module } from '@nestjs/common';
import { LoginAttemptsService } from './login-attempts.service';
import { LoginAttemptsController } from './login-attempts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginAttemptEntity } from './login-attempts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LoginAttemptEntity])],
  providers: [LoginAttemptsService],
  controllers: [LoginAttemptsController],
})
export class LoginAttemptsModule {}
