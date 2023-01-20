import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { IotconLogger } from '~iotcon-sdk';

@Catch()
export class GlobalGenericExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: IotconLogger) {}
  // required for generic handling
  // eslint-disable-next-line
  catch(exception: any, _host: ArgumentsHost): Observable<never> {
    this.logger.error(exception.message, exception);

    if (exception.errors) {
      return throwError(() => {
        return new RpcException(exception.message);
      });
    }
  }
}
