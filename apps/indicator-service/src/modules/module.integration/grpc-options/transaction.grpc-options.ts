import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import process from 'process';

const protoPath = join(__dirname, '../../../../../../proto/transaction.proto');
const protoDir = join(__dirname, '../../../../../../proto');
const { NODE_ENV, GRPC_PORT_TRANSACTION_SERVICE, URL } = process.env;

export const transactionGrpcOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'transaction',
    protoPath,
    url:
      NODE_ENV === 'development'
        ? `0.0.0.0:${GRPC_PORT_TRANSACTION_SERVICE}`
        : `${URL}:${GRPC_PORT_TRANSACTION_SERVICE}`,
    keepalive: {
      keepaliveTimeMs: 120000,
      keepaliveTimeoutMs: 20000,
      keepalivePermitWithoutCalls: 1,
      http2MinTimeBetweenPingsMs: 120000,
      http2MaxPingsWithoutData: 0,
    },
    loader: {
      keepCase: true,
      longs: Number,
      enums: String,
      defaults: false,
      arrays: true,
      objects: true,
      includeDirs: [protoDir],
    },
  },
};
