import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): object {
    return { message: 'Welcome to nestjs-boiler-plate' };
  }
}
