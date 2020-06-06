import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger: Logger = new Logger('LoggerMiddleware');
  use(req: Request, res: Response, next: () => void) {
    if (!req.originalUrl.includes('/health')) {
      this.logger.debug(
        `-> ${req.method} ${req.originalUrl} <- ${res.statusCode} ${res}`,
      );
    }
    next();
  }
}
