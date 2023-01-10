import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ErrorCodes } from '~iotcon-errors';
import { IDataSourceDto, IDataSourceId } from '~iotcon-proto';
import { AppService } from './app.service';
import { ForbiddenRpcError } from './core/errors/rpc-errors';

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
    throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, ['hello']);

    return { id: data.id };
  }
}
