import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { CreateUserDto, LoginDto } from './dtos/user.dto';
import { UserEntity } from './users.entity';
import { hashPassword, verifyPassword } from 'src/helpers/hash';
import { generateOTP } from 'src/helpers/misc';
import { otpService } from '../otp/otp.service';
import { OtpDTO } from '../otp/dto/otp.dto';
import { AuthService } from '../auth/auth.service';
import { Payload } from '../auth/payload.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private verifyService: otpService,
    private readonly authService: AuthService,
  ) {}
  /*
     @role saves a new user
     @param CreateUserDto
     @return User
    */
  public async save(createUserDto: CreateUserDto) {
    const { password, email, phone_number } = createUserDto;
    createUserDto.password = await hashPassword(password);
    const phoneExists = await this.findUser({ phone_number });
    if (phoneExists)
      throw new BadRequestException(
        `User with phone number [${phone_number}] already exists`,
      );
    const userExists = await this.findUser({ email });
    if (userExists)
      throw new BadRequestException(
        `User with email [${email}] already exists`,
      );

    const otp = await generateOTP();
    const user = await this.userRepository.save(createUserDto);
    const verification = await this.verifyService.create({
      user_id: user.id,
      code: otp,
    });
    return {
      success: true,
      message: 'Verification email sent to ' + email,
    };
  }

  public async verifyEmail(verifyEmailDto: OtpDTO) {
    const { email, code } = verifyEmailDto;
    const user = await this.findUser({ email });
    if (!user)
      throw new NotFoundException(`User with email [${email}] is not found`);
    const otp = await this.verifyService.findOne({ code, user_id: user.id });
    if (!otp) throw new BadRequestException('Email verification failed');
    this.verifyService.deleteOneByUser(user.id);
    this.userRepository.update(user.id, {is_verified: true});
    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findUser({ email });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordVerified = await verifyPassword(user.password, password);
    if (!isPasswordVerified)
      throw new UnauthorizedException('Invalid credentials');
    if (!user.is_verified)
      throw new BadRequestException('Account not verified');
    const userPayload: Payload = {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      role: user.role,
      avatar_url: user.avatar_url,
    };
    return {
      success: true,
      data: {
        accessToken: await this.authService.signToken(userPayload),
      },
    };
  }

  public async findUser(object: any) {
    try {
      return this.userRepository.findOne({ where: object });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async getProfile(req: any){
    return req.user;
  }
}
