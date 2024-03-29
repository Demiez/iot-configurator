import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { ErrorCodes, ErrorDetailsType, ErrorResponse } from '~iotcon-errors';

function createMessage(
  errorCode: ErrorCodes,
  errorDetails: ErrorDetailsType,
): string {
  let errorDataMessage = '';

  if (errorDetails.length > 0) {
    const isStringDetail = typeof errorDetails[0] === 'string';

    if (isStringDetail) {
      errorDataMessage =
        errorDetails.length === 1 ? errorDetails[0] : errorDetails.join(',');
    } else {
      errorDataMessage = JSON.stringify(errorDetails);
    }
  }

  return `${errorCode}/${errorDataMessage}`;
}

export function handleRpcError(error: ErrorResponse): void {
  const details = error.details.split('/');
  const code = details[0] as ErrorCodes;
  const errorMessage = details[1];

  switch (error.code) {
    case 3:
      throw new BadRequestRpcError(code, [errorMessage]);
    case 16:
      throw new UnauthorizedRpcError(code, [errorMessage]);
    case 9:
      throw new ForbiddenRpcError(code, [errorMessage]);
    case 5: {
      throw new NotFoundRpcError(code, [errorMessage]);
    }
    case 13:
    default:
      throw new InternalRpcError(code, [errorMessage]);
  }
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
