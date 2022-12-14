import { NextFunction, Request } from 'express';
import { RequestHandler, Response } from 'express-serve-static-core';
import { isEmpty, isObject } from 'lodash';

// TODO: add base logger
export function wrapRouteAction(action: RequestHandler) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // logging for health-checks is disabled
      if (!req.originalUrl.includes('health-check')) {
        console.info(
          `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
        );
      }

      await Promise.resolve(action(req, res, next));
    } catch (e) {
      if (!isEmpty(e.errorDetails)) {
        console.error(
          isObject(e.errorDetails[0])
            ? (e.errorDetails[0] as { message: string }).message
            : e.errorDetails[0],
          e
        );
      } else {
        console.error('', e);
      }

      next(e);
    }
  };
}
