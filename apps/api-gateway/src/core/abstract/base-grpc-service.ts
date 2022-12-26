import { ChannelCredentials } from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import process from 'process';
import Container from 'typedi';
import { IotconLogger } from '~iotcon-sdk';
import { GRPC_SSL_CREDENTIALS_MESSAGE } from '../constants';

export abstract class BaseGrpcClientService {
  protected readonly logger: IotconLogger;
  protected credentials: ChannelCredentials;

  constructor() {
    this.logger = Container.get(IotconLogger);
  }

  protected setCredentials() {
    const { SSL_ON, ROOT_CERT } = process.env;

    if (SSL_ON === 'true') {
      const rootCert = readFileSync(ROOT_CERT);

      this.credentials = ChannelCredentials.createSsl(rootCert);

      this.logger.log(GRPC_SSL_CREDENTIALS_MESSAGE);
    } else {
      this.credentials = ChannelCredentials.createInsecure();

      this.logger.log(GRPC_SSL_CREDENTIALS_MESSAGE);
    }
  }
}
