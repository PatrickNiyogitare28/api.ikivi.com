import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { EUserRole } from 'src/enums/EUserRole';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: any, _: Response, next: Function) {
    try {
      if (!req.user) throw new UnauthorizedException('Unauthorized');
      if (req.user.role == EUserRole.SYSTEM_ADMIN)
        throw new UnauthorizedException('Access denied');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    next();
  }
}
