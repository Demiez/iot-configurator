import { Service } from 'typedi';
import { IIndicator } from '~iotcon-models';
import {
  IndicatorRpcNamesEnum,
  IndicatorServiceClient,
  mapIndicator,
} from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import { IndicatorRequestModel, IndicatorViewModel } from './models';

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
    requestModel: IndicatorRequestModel
  ): Promise<IndicatorViewModel> {
    const result = await this.sendUnaryGrpcRequest<
      IndicatorServiceClient,
      IIndicator,
      IIndicator
    >(
      this.grpcClient,
      IndicatorRpcNamesEnum.CREATE_INDICATOR,
      requestModel,
      mapIndicator
    );

    return new IndicatorViewModel(result);
  }
}
