import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/creat-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags("User")
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    /*
     @role saves a new user
     @param CreateUserDto
     @return User
     @endpoint /api/v1/user
    */
    @Post('/')
    @HttpCode(201)
    public async save(
        @Body() createUserDto: CreateUserDto
    ): Promise<any>{
        return await this.userService.save(createUserDto);
    }
}
