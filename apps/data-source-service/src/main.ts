import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SDK, enums } from '~iotcon-sdk';
import process from 'process';
import { resolve } from 'path';
import { Logger } from '@nestjs/common';
import { GlobalRpcExceptionFilter } from './core/filters/global-rpc-exception.filter';

const { NODE_ENV, GRPC_PORT_DATA_SOURCE_SERVICE, PORT_DATA_SOURCE_SERVICE } =
  process.env;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: SDK._initializeLogger(
      enums.MetaContextEnum.DATA_SOURCE_SERVICE,
      NODE_ENV === 'development' ? resolve(__dirname) : undefined,
    ),
  });

  app.use(express.json({ limit: '10mb' }));
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 10000,
    }),
  );
  app.useGlobalFilters(new GlobalRpcExceptionFilter());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'datasource',
        protoPath: join(__dirname, '../../../proto/datasource.proto'),
        url:
          NODE_ENV === 'development'
            ? `0.0.0.0:${GRPC_PORT_DATA_SOURCE_SERVICE}`
            : `${URL}:${GRPC_PORT_DATA_SOURCE_SERVICE}`,
        keepalive: {
          keepaliveTimeMs: 120000,
          keepaliveTimeoutMs: 20000,
          keepalivePermitWithoutCalls: 1,
          http2MinTimeBetweenPingsMs: 120000,
          http2MaxPingsWithoutData: 0,
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.listen(PORT_DATA_SOURCE_SERVICE);
  Logger.log(`HTTP Server is listening on port ${PORT_DATA_SOURCE_SERVICE}`);

  await app.startAllMicroservices();
  Logger.log(
    `gRPC Server is listening on port ${GRPC_PORT_DATA_SOURCE_SERVICE}`,
  );
}
bootstrap();
