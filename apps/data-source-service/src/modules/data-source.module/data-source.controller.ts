import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IDataSourceDto, IDataSourceId } from '~iotcon-proto';
import { DataSourceService } from './data-source.service';

@Controller()
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @GrpcMethod('DataSourceService', 'CreateDataSource')
  public async createDataSource(
    data: IDataSourceDto,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceDto, IDataSourceId>,
  ): Promise<IDataSourceId> {
    // throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, ['hello']);

    const dataSourceId = await this.dataSourceService.createDataSource();

    return { id: dataSourceId };
  }
}
