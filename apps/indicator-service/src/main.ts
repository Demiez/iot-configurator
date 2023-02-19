import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import { IotconLogger } from '~iotcon-sdk';
import { MetaContextEnum } from '~iotcon-models';
import process from 'process';
import { resolve } from 'path';
import { Logger } from '@nestjs/common';
import {
  GlobalGenericExceptionFilter,
  GlobalRpcExceptionFilter,
} from './core/filters';

const { NODE_ENV, GRPC_PORT_INDICATOR_SERVICE } = process.env;

async function bootstrap() {
  const logger = new IotconLogger(
    MetaContextEnum.INDICATOR_SERVICE,
    NODE_ENV === 'development' ? resolve(__dirname) : undefined,
  );
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  });
  const protoPath = join(__dirname, '../../../proto/indicator.proto');

  app.use(express.json({ limit: '10mb' }));
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: true,
      parameterLimit: 10000,
    }),
  );
  app.useGlobalFilters(
    new GlobalGenericExceptionFilter(logger),
    new GlobalRpcExceptionFilter(logger),
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: 'indicator',
        protoPath,
        url:
          NODE_ENV === 'development'
            ? `0.0.0.0:${GRPC_PORT_INDICATOR_SERVICE}`
            : `${URL}:${GRPC_PORT_INDICATOR_SERVICE}`,
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
          includeDirs: [protoPath],
        },
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  Logger.log(`gRPC Server is listening on port ${GRPC_PORT_INDICATOR_SERVICE}`);
}
bootstrap();
