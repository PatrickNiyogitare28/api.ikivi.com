import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  logger = new Logger('HTTP');
  use(req: Request, res: Response, next: Function) {
    const { ip, method, originalUrl: url } = req;
    const hostname = require('os').hostname();
    const userAgent = req.get('user-agent') || '';
    const referer = req.get('referer') || '';

    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length');
      this.logger.log(
        `[${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${referer}" "${userAgent}" "${ip}"`,
      );
    });

    next();
  }
}
