import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { join } from 'path';
import {
  CacheModule,
  DbProvider,
  IntegrationModule,
  RmqModule,
  TransactionModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    DbProvider._initialize(),
    RmqModule,
    TransactionModule,
    IntegrationModule,
    CacheModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
