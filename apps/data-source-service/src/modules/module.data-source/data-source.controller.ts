import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  DataSourceDataModel,
  IDataSource,
  IDataSourceId,
} from '~iotcon-models';
import { RpcServicesEnum, DataSourceRpcNamesEnum } from '~iotcon-proto';
import { DataSourceService } from './data-source.service';

@Controller()
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.CREATE_DATA_SOURCE,
  )
  public async createDataSource(
    data: IDataSource,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSource, IDataSourceId>,
  ): Promise<IDataSourceId> {
    const dataSourceData = new DataSourceDataModel(data);

    const result = await this.dataSourceService.createDataSource(
      dataSourceData,
    );

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.GET_DATA_SOURCE_BY_ID,
  )
  public async getDataSourceById(
    data: IDataSourceId,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSource, IDataSourceId>,
  ): Promise<IDataSource> {
    const result = await this.dataSourceService.getDataSourceById(data.id);

    return result;
  }
}
