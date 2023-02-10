import { Service } from 'typedi';
import {
  DataSourceRpcNamesEnum,
  DataSourceServiceClient,
  Empty,
  mapDataSource,
  mapDataSources,
} from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import process from 'process';
import {
  DataSourceIdViewModel,
  DataSourceRequestModel,
  DataSourcesIdsRequestModel,
  DataSourcesViewModel,
  DataSourceViewModel,
} from './models';
import {
  IDataSource,
  IDataSourceId,
  IDataSources,
  IDataSourcesIds,
  StandardResponseViewModel,
} from '~iotcon-models';

@Service()
export class DataSourceService extends BaseGrpcClientService {
  private grpcClient: DataSourceServiceClient;
  private serverAddress: string;

  constructor() {
    super();

    const { NODE_ENV, GRPC_PORT_DATA_SOURCE_SERVICE, URL } = process.env;

    this.setCredentials();

    this.serverAddress =
      NODE_ENV === 'development'
        ? `localhost:${GRPC_PORT_DATA_SOURCE_SERVICE}`
        : `${URL}:${GRPC_PORT_DATA_SOURCE_SERVICE}`;

    this.grpcClient = new DataSourceServiceClient(
      this.serverAddress,
      this.credentials
    );

    this.logger.log(`gRPC Client started for ${this.serverAddress}`);
  }

  public async createDataSource(
    requestModel: DataSourceRequestModel
  ): Promise<DataSourceIdViewModel> {
    const result = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSource,
      IDataSourceId
    >(this.grpcClient, DataSourceRpcNamesEnum.CREATE_DATA_SOURCE, requestModel);

    return new DataSourceIdViewModel(result);
  }

  public async getDataSourceById(
    dataSourceId: string
  ): Promise<DataSourceViewModel> {
    const dataSource = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSourceId,
      IDataSource
    >(
      this.grpcClient,
      DataSourceRpcNamesEnum.GET_DATA_SOURCE_BY_ID,
      {
        id: dataSourceId,
      },
      mapDataSource
    );

    return new DataSourceViewModel(dataSource);
  }

  public async getAllDataSources(): Promise<DataSourcesViewModel> {
    const dataSourcesData = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      Empty,
      IDataSources
    >(
      this.grpcClient,
      DataSourceRpcNamesEnum.GET_ALL_DATA_SOURCES,
      undefined,
      mapDataSources
    );

    return new DataSourcesViewModel(dataSourcesData);
  }

  public async getDataSourcesByIds(
    requestModel: DataSourcesIdsRequestModel
  ): Promise<DataSourcesViewModel> {
    const dataSourcesData = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSourcesIds,
      IDataSources
    >(
      this.grpcClient,
      DataSourceRpcNamesEnum.GET_DATA_SOURCE_BY_ID,
      requestModel,
      mapDataSources
    );

    return new DataSourcesViewModel(dataSourcesData);
  }

  public async deleteDataSourceById(
    dataSourceId: string
  ): Promise<StandardResponseViewModel<unknown>> {
    await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSourceId,
      Empty
    >(this.grpcClient, DataSourceRpcNamesEnum.DELETE_DATA_SOURCE_BY_ID, {
      id: dataSourceId,
    });

    return new StandardResponseViewModel({});
  }
}
