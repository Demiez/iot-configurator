import { Service } from 'typedi';
import {
  DataSourceServiceClient,
  IDataSourceDto,
  IDataSourceId,
} from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import process from 'process';
import { promisify } from 'util';

@Service()
export class DataSourceService extends BaseGrpcClientService {
  private grpcClient: DataSourceServiceClient;
  private serverAddress: string;

  constructor() {
    super();

    const { NODE_ENV, DATA_SOURCE_SERVICE_PORT, URL } = process.env;

    this.setCredentials();

    this.serverAddress =
      NODE_ENV === 'development'
        ? `localhost:${DATA_SOURCE_SERVICE_PORT}`
        : `${URL}:${DATA_SOURCE_SERVICE_PORT}`;

    this.grpcClient = new DataSourceServiceClient(
      this.serverAddress,
      this.credentials
    );
  }

  public async createDataSource(requestModel: IDataSourceDto) {
    const result = await new Promise((resolve, reject) => {
      this.grpcClient.createDataSource(
        requestModel,
        (err, res: IDataSourceId) => {
          if (err) {
            reject(err);
          }

          console.log(
            `DataSource was created:\n${JSON.stringify(res, null, 4)}`
          );
          resolve(res.id);
        }
      );
    });

    return result;
  }
}
