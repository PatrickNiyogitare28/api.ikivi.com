import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): object {
    return { message: 'Welcome to Ikivi Api  v1.0.0' };
  }
}
