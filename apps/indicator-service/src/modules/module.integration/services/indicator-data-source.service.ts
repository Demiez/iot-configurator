import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import {
  IDataSource,
  IDataSourceId,
  IDataSources,
  IDataSourcesByTypes,
  IDataSourcesIds,
} from '~iotcon-models';
import { Empty, RpcServicesEnum } from '~iotcon-proto';
import { handleRpcError } from '../../../core/errors/rpc-errors';
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
}
