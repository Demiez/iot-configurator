import { ChannelCredentials } from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import process from 'process';

export abstract class BaseGrpcClientService {
  protected credentials: ChannelCredentials;

  protected setCredentials() {
    const { SSL_ON, ROOT_CERT } = process.env;

    if (SSL_ON === 'true') {
      const rootCert = readFileSync(ROOT_CERT);

      this.credentials = ChannelCredentials.createSsl(rootCert);

      // TODO: add logger
      // console.log('Set client ssl credentials');
    } else {
      this.credentials = ChannelCredentials.createInsecure();

      // console.log('Set client insecure credentials');
    }
  }
}
