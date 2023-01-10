import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { ErrorCodes, ErrorDetailsType } from '~iotcon-errors';

function createMessage(
  errorCode: ErrorCodes,
  errorDetails: ErrorDetailsType,
): string {
  let errorDataMessage = '';

  if (errorDetails.length > 0) {
    errorDataMessage =
      errorDetails.length === 1 ? errorDetails[0] : errorDetails.join(',');
  }

  return `${errorCode}/${errorDataMessage}`;
}

export class ForbiddenRpcError extends RpcException {
  constructor(errorCode: ErrorCodes, errorDetails: ErrorDetailsType) {
    super({
      code: status.FAILED_PRECONDITION,
      message: createMessage(errorCode, errorDetails),
    });
  }
}

export class BadRequestRpcError extends RpcException {
  constructor(errorCode: ErrorCodes, errorDetails: ErrorDetailsType) {
    super({
      code: status.INVALID_ARGUMENT,
      message: createMessage(errorCode, errorDetails),
    });
  }
}

export class NotFoundRpcError extends RpcException {
  constructor(errorCode: ErrorCodes, errorDetails: ErrorDetailsType) {
    super({
      code: status.NOT_FOUND,
      message: createMessage(errorCode, errorDetails),
    });
  }
}

export class UnauthorizedRpcError extends RpcException {
  constructor(errorCode: ErrorCodes, errorDetails: ErrorDetailsType) {
    super({
      code: status.UNAUTHENTICATED,
      message: createMessage(errorCode, errorDetails),
    });
  }
}

export class InternalRpcError extends RpcException {
  constructor(errorCode: ErrorCodes, errorDetails: ErrorDetailsType) {
    super({
      code: status.INTERNAL,
      message: createMessage(errorCode, errorDetails),
    });
  }
}
