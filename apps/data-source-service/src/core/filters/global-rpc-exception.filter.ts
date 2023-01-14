import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { IotconLogger } from '~iotcon-sdk';

@Catch(RpcException)
export class GlobalRpcExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  constructor(private readonly logger: IotconLogger) {}
  catch(exception: RpcException, _host: ArgumentsHost): Observable<never> {
    this.logger.error(exception.message, exception);

    return throwError(() => {
      const error = exception.getError();

      return error;
    });
  }
}
