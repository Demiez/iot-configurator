import { Service } from 'typedi';
import { IndicatorServiceClient } from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';

@Service()
export class IndicatorService extends BaseGrpcClientService {
  private grpcClient: IndicatorServiceClient;
  private serverAddress: string;

  constructor() {
    super();

    const { NODE_ENV, GRPC_PORT_INDICATOR_SERVICE, URL } = process.env;

    this.setCredentials();

    this.serverAddress =
      NODE_ENV === 'development'
        ? `localhost:${GRPC_PORT_INDICATOR_SERVICE}`
        : `${URL}:${GRPC_PORT_INDICATOR_SERVICE}`;

    this.grpcClient = new IndicatorServiceClient(
      this.serverAddress,
      this.credentials
    );

    this.logger.log(`gRPC Client started for ${this.serverAddress}`);
  }

  public async createIndicator(
    requestModel: DataSourceRequestModel
  ): Promise<void> {
    const result = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSource,
      IDataSourceId
    >(this.grpcClient, DataSourceRpcNamesEnum.CREATE_DATA_SOURCE, requestModel);

    return new DataSourceIdViewModel(result);
  }
}
