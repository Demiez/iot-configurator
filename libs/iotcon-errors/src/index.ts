/**
 * This is the entrypoint for the IoT Configurator Errors.
 * This lib contains sharable error models
 */

import { errorDetailsType } from './types/error-details.type';
import {
  RpcForbiddenError,
  RpcBadRequestError,
  RpcNotFoundError,
  RpcUnauthorizedError,
  RpcInternalError,
  RpcError,
} from './rpc/rpc-error-response';

export {
  errorDetailsType,
  RpcForbiddenError,
  RpcBadRequestError,
  RpcNotFoundError,
  RpcUnauthorizedError,
  RpcInternalError,
  RpcError,
};
