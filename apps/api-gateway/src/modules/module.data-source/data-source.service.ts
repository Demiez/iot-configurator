import { Service } from 'typedi';
import {
  DataSourceServiceClient,
  IDataSourceDto,
  IDataSourceId,
} from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import process from 'process';
import { IotconLogger } from '~iotcon-sdk';
import { ErrorCodes, InternalServerError } from '../../core/errors';
import { ProcedureNamesEnum } from './enums/procedure-names.enum';

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

  public async createDataSource(requestModel: IDataSourceDto) {
    // throw new InternalServerError(ErrorCodes.INVALID_AUTH_PARAMS, ['ER']);
    // const result = await new Promise((resolve, reject) => {
    //   this.grpcClient['createDataSource'](
    //     requestModel,
    //     (err, res: IDataSourceId) => {
    //       if (err) {
    //         return reject(err);
    //       }

    //       this.logger.log(
    //         `DataSource was created:\n${JSON.stringify(res, null, 4)}`
    //       );
    //       resolve(res.id);
    //     }
    //   );
    // });

    const result = await this.sendUnaryGrpcRequest<
      DataSourceServiceClient,
      IDataSourceDto,
      IDataSourceId
    >(this.grpcClient, ProcedureNamesEnum.CREATE_DATA_SOURCE, requestModel);

    return result;
  }
}
