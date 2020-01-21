import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('Routes');

  use(req: Request, res: Response, next: () => void) {

    const receivedAt = moment();

    res.once('finish', () => {
      const url = req.url;
      const method = req.method;
      const finishedAt = moment();
      const delta = finishedAt.diff(receivedAt);
      const code = res.statusCode;

      let logLevel: 'log' | 'error' = 'log';

      if (code >= 400) {
        logLevel = 'error';
      }

      let showBody = false;

      if (method === 'POST') {
        showBody = true;
      }

      let msg = `${method} TT:${delta}ms C:${code} ${url}`;

      if (showBody) {
        msg += ' ClientBody: ' + JSON.stringify(req.body);
      }

      this.logger[logLevel](msg);
    });

    next();
  }
}
