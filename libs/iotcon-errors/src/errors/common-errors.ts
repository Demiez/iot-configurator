import { ErrorResponseTypes } from '../enums/error-response-types.enum';
import { ErrorDetailsType } from '../types/error-details.type';

export class ErrorResponse extends Error {
  public type: ErrorResponseTypes;

  public errorCode: string;

  public errorDetails: ErrorDetailsType;

  // to adopt MongoError and RPC handling
  public code?: number;
  public details?: string;
  public level?: string;
  public metadata?: unknown;
  public timestamp?: Date;

  constructor(errorCode: string, errorDetails: ErrorDetailsType = []) {
    super(errorCode);
    this.errorCode = errorCode;
    this.errorDetails = errorDetails;
    this.type = ErrorResponseTypes.INTERNAL_SERVER_ERROR;
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.FORBIDDEN;
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.UNAUTHORIZED;
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.NOT_FOUND;
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.INTERNAL_SERVER_ERROR;
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(errorCode: string, errorDetails: any[] = []) {
    super(errorCode, errorDetails);
    this.type = ErrorResponseTypes.BAD_REQUEST;
  }
}
