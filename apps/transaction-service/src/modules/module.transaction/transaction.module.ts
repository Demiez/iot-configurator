import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '../module.cache/cache.module';
import { DataSourceModule } from '../module.data-source/data-source.module';
import {
  publisherModelFactory,
  sensorModelFactory,
  variableModelFactory,
} from '../module.db/schemas';
import { IntegrationModule } from '../module.integration/integration.module';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [Logger, TransactionService],
  imports: [
    MongooseModule.forFeatureAsync([
      sensorModelFactory,
      publisherModelFactory,
      variableModelFactory,
    ]),
    IntegrationModule,
    CacheModule,
    DataSourceModule,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
