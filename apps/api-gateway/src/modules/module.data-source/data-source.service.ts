import { Service } from 'typedi';
import { DataSourceServiceClient } from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import process from 'process';
import { ProcedureNamesEnum } from './enums/procedure-names.enum';
import { DataSourceIdViewModel, DataSourceRequestModel } from './models';
import { IDataSource, IDataSourceId } from '~iotcon-models';

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
    >(this.grpcClient, ProcedureNamesEnum.CREATE_DATA_SOURCE, requestModel);

    return result;
  }

  public async getDataSourceById(dataSourceId: string): Promise<IDataSource> {
    const result = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSourceId,
      IDataSource
    >(this.grpcClient, ProcedureNamesEnum.GET_DATA_SOURCE_BY_ID, {
      id: dataSourceId,
    });

    return result;
  }
}
