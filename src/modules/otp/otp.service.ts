import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { config } from 'dotenv';
import { VerificationEntity } from './otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { codeDTO, OtpDTO } from './dto/otp.dto';

config();
@Injectable()
export class otpService {
  constructor(
    @InjectRepository(VerificationEntity)
    private readonly verificationRepository: Repository<VerificationEntity>,
  ) {}

  public async create(payload: codeDTO): Promise<codeDTO> {
    const verification: VerificationEntity =
      await this.verificationRepository.save(payload);
    return verification;
  }

  public async findOne(body: codeDTO): Promise<any> {
    const verification: VerificationEntity =
      await this.verificationRepository.findOne({
        where: { ...body },
      });
    if (!verification) {
      throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
    }
    return verification;
  }

  public async deleteOneByUser(id: string): Promise<any> {
    return await this.verificationRepository.delete({ user_id: id });
  }
}
