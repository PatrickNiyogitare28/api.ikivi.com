import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', required: true })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Doe', required: true })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '0785436974', required: true })
  @Matches('^\\d{8,11}$')
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty({ example: 'johndoe@gmail.com', required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'test@gmail.com', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'https://cloudinary.com/ikivi-api/uploads/profiles/1d-eda.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar_url: string;
}

export class LoginDto {
  @ApiProperty({ example: 'johndoe@gmail.com', required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'test@gmail.com', required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
