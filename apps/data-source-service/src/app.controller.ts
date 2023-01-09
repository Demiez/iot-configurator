import { Metadata, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { IDataSourceDto, IDataSourceId } from '~iotcon-proto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('DataSourceService', 'CreateDataSource')
  createDataSource(
    data: IDataSourceDto,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceDto, IDataSourceId>,
  ): IDataSourceId {
    throw new RpcException({
      code: status.NOT_FOUND,
      message: 'Explicit message in',
    });
    return { id: data.id };
  }
}
