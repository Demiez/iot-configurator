import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { isEmpty } from 'lodash';
import { lastValueFrom, Observable } from 'rxjs';
import { ErrorCodes } from '~iotcon-errors';
import {
  DataSourcesByTypesRequestModel,
  DataSourceTypesEnum,
  IDataSource,
  IDataSourceId,
  IDataSources,
  IDataSourcesByTypes,
  IDataSourcesIds,
  DataSourceGenericDataModel,
} from '~iotcon-models';
import { Empty, RpcServicesEnum } from '~iotcon-proto';
import {
  handleRpcError,
  NotFoundRpcError,
} from '../../../core/errors/rpc-errors';
import { dataSourceGrpcOptions } from '../grpc-options';

interface IDataSourceGrpcService {
  getAllDataSources(request: Empty): Observable<IDataSources>;
  getDataSourceById(request: IDataSourceId): Observable<IDataSource>;
  getDataSourcesByIds(request: IDataSourcesIds): Observable<IDataSources>;
  getDataSourcesByTypes(request: IDataSourcesByTypes): Observable<IDataSources>;
}

@Injectable()
export class IndicatorDataSourceService implements OnModuleInit {
  @Client(dataSourceGrpcOptions) private readonly client: ClientGrpc;
  private dataSourceClient: IDataSourceGrpcService;

  constructor(private readonly logger: Logger) {}

  public onModuleInit(): void {
    this.dataSourceClient = this.client.getService<IDataSourceGrpcService>(
      RpcServicesEnum.DATA_SOURCE_SERVICE,
    );
  }

  public async getDataSources(): Promise<IDataSources> {
    try {
      const result$ = this.dataSourceClient.getAllDataSources({});

      const dataSources = await lastValueFrom(result$);

      return dataSources;
    } catch (error) {
      handleRpcError(error);
    }
  }

  public async getDataSourceById(dataSourceId: string): Promise<IDataSource> {
    try {
      const result$ = this.dataSourceClient.getDataSourceById({
        id: dataSourceId,
      });

      const dataSource = await lastValueFrom(result$);

      return dataSource;
    } catch (error) {
      handleRpcError(error);
    }
  }

  public async getDataSourcesByIds(
    ids: string[],
  ): Promise<DataSourceGenericDataModel[]> {
    let result: IDataSources;

    try {
      const result$ = this.dataSourceClient.getDataSourcesByIds({
        ids,
      });

      result = await lastValueFrom(result$);
    } catch (error) {
      handleRpcError(error);
    }

    if (isEmpty(result.dataSources)) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        'No dataSources found by ids',
      ]);
    }

    this.logger.log(`Found ${result.total} dataSources by ids`);

    return result.dataSources.map(
      (dataSource) => new DataSourceGenericDataModel(dataSource),
    );
  }

  public async getDataSourcesByTypes(
    types: DataSourceTypesEnum[],
    isDefault: boolean,
  ): Promise<DataSourceGenericDataModel[]> {
    const requestModel = new DataSourcesByTypesRequestModel(types, isDefault);

    let result: IDataSources;

    try {
      const result$ = this.dataSourceClient.getDataSourcesByTypes(requestModel);

      result = await lastValueFrom(result$);
    } catch (error) {
      handleRpcError(error);
    }

    if (result.total !== types.length) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        'Failed to find all dataSources by types',
      ]);
    }

    this.logger.log(
      `Found ${result.total} ${
        isDefault ? 'default' : 'standard'
      } dataSources by types`,
    );

    return result.dataSources.map(
      (dataSource) => new DataSourceGenericDataModel(dataSource),
    );
  }
}
