import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  DataSourceDataModel,
  DataSourceIdDataModel,
  DataSourcesDataModel,
  IDataSource,
  IDataSourceId,
  IDataSources,
  IDataSourcesByTypes,
  IDataSourcesIds,
} from '~iotcon-models';
import { RpcServicesEnum, DataSourceRpcNamesEnum, Empty } from '~iotcon-proto';
import { DataSourceService } from './data-source.service';

@Controller()
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.CREATE_DATA_SOURCE,
  )
  public async createDataSource(
    request: IDataSource,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSource, IDataSourceId>,
  ): Promise<DataSourceIdDataModel> {
    const dataSourceData = new DataSourceDataModel(request);

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
    request: IDataSourceId,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSource, IDataSourceId>,
  ): Promise<DataSourceDataModel> {
    const result = await this.dataSourceService.getDataSourceById(request.id);

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.GET_ALL_DATA_SOURCES,
  )
  public async getAllDataSources(
    _request: Empty,
    _metadata: Metadata,
    _call: ServerUnaryCall<Empty, IDataSources>,
  ): Promise<DataSourcesDataModel> {
    const result = await this.dataSourceService.getAllDataSources();

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.GET_DATA_SOURCES_BY_TYPES,
  )
  public async getDataSourcesByTypes(
    request: IDataSourcesByTypes,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourcesByTypes, IDataSources>,
  ): Promise<DataSourcesDataModel> {
    const result = await this.dataSourceService.getDataSourcesByTypes(request);

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.GET_DATA_SOURCES_BY_IDS,
  )
  public async getDataSourcesByIds(
    request: IDataSourcesIds,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourcesIds, IDataSources>,
  ): Promise<DataSourcesDataModel> {
    const result = await this.dataSourceService.getDataSourcesByIds(request);

    return result;
  }

  @GrpcMethod(
    RpcServicesEnum.DATA_SOURCE_SERVICE,
    DataSourceRpcNamesEnum.DELETE_DATA_SOURCE_BY_ID,
  )
  public async deleteDataSourceById(
    request: IDataSourceId,
    _metadata: Metadata,
    _call: ServerUnaryCall<IDataSourceId, Empty>,
  ): Promise<void> {
    return await this.dataSourceService.deleteDataSourceById(request.id);
  }
}
