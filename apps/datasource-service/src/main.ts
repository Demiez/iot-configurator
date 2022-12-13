import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

const PORT = 3000;
const GRPC_SERVER_ADDRESS = `0.0.0.0:50051`;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'datasource',
      protoPath: join(__dirname, '../../../proto/datasource.proto'),
      url: GRPC_SERVER_ADDRESS,
      keepalive: {
        keepaliveTimeMs: 120000,
        keepaliveTimeoutMs: 20000,
        keepalivePermitWithoutCalls: 1,
        http2MinTimeBetweenPingsMs: 120000,
        http2MaxPingsWithoutData: 0,
      },
    },
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 10000,
    }),
  );

  await app.listen(3000);
  console.log(`HTTP Server is listening on port ${PORT}`);

  await app.startAllMicroservices();
  console.log(`gRPC Server is listening on ${GRPC_SERVER_ADDRESS}`);
}
bootstrap();
