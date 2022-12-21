import { Service } from 'typedi';
import { ChannelCredentials } from '@grpc/grpc-js';
import { DataSourceServiceClient } from '~iotcon-proto';
import { BaseGrpcClientService } from '../../core/abstract/base-grpc-service';
import process from 'process';

@Service()
export class DataSourceService extends BaseGrpcClientService {
  private grpcClient: DataSourceServiceClient;
  private serverAddress: string;

  constructor() {
    super();

    const { NODE_ENV, PORT, URL } = process.env;

    this.setCredentials();
    this.serverAddress =
      NODE_ENV === 'development' ? `localhost:${PORT}` : `${URL}:${PORT}`;

    this.grpcClient = new DataSourceServiceClient(
      this.serverAddress,
      this.credentials
    );
  }

  public async getDataSources() {
    await Promise.resolve([]);
  }
}
