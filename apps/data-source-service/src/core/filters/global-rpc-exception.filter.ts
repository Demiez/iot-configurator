import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { ForbiddenRpcError } from '~iotcon-errors';
import { IotconLogger } from '~iotcon-sdk';

@Catch(RpcException)
export class GlobalRpcExceptionFilter
  implements RpcExceptionFilter<RpcException | ForbiddenRpcError>
{
  constructor(private readonly logger: IotconLogger) {}
  catch(
    exception: RpcException | ForbiddenRpcError,
    _host: ArgumentsHost,
  ): Observable<never> {
    this.logger.error(exception.message, exception);

    return throwError(() => {
      const error = exception.getError();

      return error;
    });
  }
}
