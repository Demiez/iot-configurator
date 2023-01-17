import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IDataSourceDto, IDataSourceId } from '~iotcon-proto';
import { DataSourceDto } from '~iotcon-proto/lib/proto/datasource';
import { DataSourceService } from './data-source.service';
import { DataSourceRequestModel } from './models';

@Controller()
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @GrpcMethod('DataSourceService', 'CreateDataSource')
  public async createDataSource(
    data: IDataSourceDto,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceDto, IDataSourceId>,
  ): Promise<IDataSourceId> {
    const requestModel = new DataSourceRequestModel(data);

    const result = await this.dataSourceService.createDataSource(requestModel);

    return result;
  }

  @GrpcMethod('DataSourceService', 'GetDataSourceById')
  public async getDataSourceById(
    data: IDataSourceId,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceDto, IDataSourceId>,
  ): Promise<DataSourceDto> {
    const result = await this.dataSourceService.getDataSourceById(data.id);

    return result;
  }
}
