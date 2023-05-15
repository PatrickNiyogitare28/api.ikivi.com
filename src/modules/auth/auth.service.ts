import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Payload } from './payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async signToken(data: Payload) {
    return this.jwtService.sign(data);
  }

  public async decodeToken(token) {
    try {
      return this.jwtService.decode(token);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
