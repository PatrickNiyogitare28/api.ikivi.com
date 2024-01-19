/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAttemptEntity } from './login-attempts.entity';
import { Repository } from 'typeorm';
import { LoginAttemptDto } from './dto/login-attempts.dto';

@Injectable()
export class LoginAttemptsService {
  constructor(
    @InjectRepository(LoginAttemptEntity)
    private attemptRepository: Repository<LoginAttemptEntity>,
  ) {}

  public async saveAttempt(dto: LoginAttemptDto) {
    try {
      const attempt = await this.attemptRepository.save(dto);
      return attempt;
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Error occurred');
    }
  }

  public async getUserAttempts(user_id: string) {
    try {
      const attempts = await this.attemptRepository.find({
        where: { user: user_id },
      });
      return attempts;
    } catch (e) {
      throw new InternalServerErrorException('Error occurred');
    }
  }
}
