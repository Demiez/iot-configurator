/**
 * This is the entrypoint for the IoT Configurator Errors.
 * This lib contains sharable error models
 */

import { ErrorCodes } from './enums';
import { ErrorDetailsType } from './types/error-details.type';
import {
  BadRequestError,
  BadRequestRpcError,
  ForbiddenError,
  ForbiddenRpcError,
  NotFoundError,
  NotFoundRpcError,
  UnauthorizedError,
  UnauthorizedRpcError,
  InternalRpcError,
  InternalServerError,
} from './errors';

export {
  ErrorCodes,
  ErrorDetailsType,
  BadRequestError,
  BadRequestRpcError,
  ForbiddenError,
  ForbiddenRpcError,
  NotFoundError,
  NotFoundRpcError,
  UnauthorizedError,
  UnauthorizedRpcError,
  InternalRpcError,
  InternalServerError,
};
