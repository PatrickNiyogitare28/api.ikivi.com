import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { OtpDTO } from '../otp/dto/otp.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
     @role saves a new user
     @param CreateUserDto
     @return User
     @endpoint /api/v1/user
  */
  @Post('/')
  @HttpCode(201)
  public async save(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.save(createUserDto);
  }

   /*
     @role login a new user
     @param LoginDto
     @return AccessToken
     @endpoint /api/v1/login
  */
     @Post('/login')
     @HttpCode(201)
     public async login(@Body() loginDto: LoginDto): Promise<any> {
       return await this.userService.login(loginDto);
     }

  /*
     @role verifies user's email with code
     @param verificationCode
     @return void
     @endpoint /api/v1/user/verify-email
  */
  @Post('/verify-email')
  @HttpCode(200)
  public async verifyEmail(@Body() verificationCode: OtpDTO): Promise<any> {
    return await this.userService.verifyEmail(verificationCode);
  }

  @ApiBearerAuth()
  @Get('/profile')
  public async getProfile(@Req() req: any): Promise<any> {
   return await this.userService.getProfile(req);
  }

}
