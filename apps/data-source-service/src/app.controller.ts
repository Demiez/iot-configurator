import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { RpcForbiddenError, RpcError } from '~iotcon-errors';
import { IDataSourceDto, IDataSourceId } from '~iotcon-proto';
import { AppService } from './app.service';

class RpcErrorResponse extends RpcException {
  public isRpcError: boolean = true;
  public source: string;

  constructor(code: number, message: string) {
    super({
      code,
      message,
      isRpcError: true,
    });
  }

  // public getError() {
  //   return this.getError();
  // }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseFilters(new ExceptionFilter())
  @GrpcMethod('DataSourceService', 'CreateDataSource')
  createDataSource(
    data: IDataSourceDto,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceDto, IDataSourceId>,
  ): IDataSourceId {
    // throw new RpcException({
    //   code: status.PERMISSION_DENIED,
    //   message: 'hello',
    // });
    // throw new RpcForbiddenError(['not available']);

    throw new RpcErrorResponse(status.PERMISSION_DENIED, 'hello');

    // throw RpcError.FORBIDDEN('hello');

    return { id: data.id };
  }
}
