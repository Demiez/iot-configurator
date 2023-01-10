import { Application, NextFunction, Request, Response } from 'express';
import { inRange } from 'lodash';
import { BaseStatus } from '../enums/base-statuses.enum';
import { ErrorResponseTypes } from '../enums/error-response-types.enum';
import { ErrorResponse } from '../errors';
import { FieldIsBadModel, StandardResponseViewModel } from '../view-models';

function handleRpcError(
  error: ErrorResponse,
  res: Response
): Response<unknown, Record<string, unknown>> {
  delete error.metadata;
  delete error.level;

  switch (error.code) {
    case 3:
      return res
        .status(BaseStatus.BAD_REQUEST)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            error.details,
            BaseStatus.BAD_REQUEST
          )
        );

    case 16:
      return res
        .status(BaseStatus.UNAUTHORIZED)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            error.details,
            BaseStatus.UNAUTHORIZED
          )
        );

    case 9:
      return res
        .status(BaseStatus.FORBIDDEN)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            error.details,
            BaseStatus.FORBIDDEN
          )
        );
    case 5: {
      return res
        .status(BaseStatus.NOT_FOUND)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            error.details,
            BaseStatus.NOT_FOUND
          )
        );
    }
    case 13:
    default:
      return res
        .status(BaseStatus.INTERNAL_SERVER_ERROR)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            error.details || 'Internal Server Error',
            BaseStatus.INTERNAL_SERVER_ERROR
          )
        );
  }
}

function handleCommonError(
  error: ErrorResponse,
  errorMessage: string,
  res: Response
): Response<unknown, Record<string, unknown>> {
  switch (error.type) {
    case ErrorResponseTypes.BAD_REQUEST:
      return res
        .status(BaseStatus.BAD_REQUEST)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            errorMessage,
            BaseStatus.BAD_REQUEST
          )
        );

    case ErrorResponseTypes.UNAUTHORIZED:
      return res
        .status(BaseStatus.UNAUTHORIZED)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            errorMessage,
            BaseStatus.UNAUTHORIZED
          )
        );

    case ErrorResponseTypes.FORBIDDEN:
      return res
        .status(BaseStatus.FORBIDDEN)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            errorMessage,
            BaseStatus.FORBIDDEN
          )
        );
    case ErrorResponseTypes.NOT_FOUND: {
      return res
        .status(BaseStatus.NOT_FOUND)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            errorMessage,
            BaseStatus.NOT_FOUND
          )
        );
    }
    default:
      return res
        .status(BaseStatus.INTERNAL_SERVER_ERROR)
        .send(
          new StandardResponseViewModel<ErrorResponse>(
            error,
            'Internal Server Error',
            BaseStatus.INTERNAL_SERVER_ERROR
          )
        );
  }
}

export default (app: Application): void => {
  app.use(
    // required for middleware
    // eslint-disable-next-line
    (error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
      let errorMessage: string;

      if (
        error.errorDetails &&
        error.errorDetails.length > 0 &&
        error.errorDetails[0] instanceof FieldIsBadModel
      ) {
        errorMessage =
          error.message +
          ': ' +
          error.errorDetails
            .map((errorDetail: FieldIsBadModel) => errorDetail.message)
            .join(', ');
      } else {
        errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;
      }

      if (error.code && inRange(error.code, 1, 16)) {
        return handleRpcError(error, res);
      }

      return handleCommonError(error, errorMessage, res);
    }
  );
};
