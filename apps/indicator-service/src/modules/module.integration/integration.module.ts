import { Logger, Module } from '@nestjs/common';
import { IndicatorDataSourceService } from './services/indicator-data-source.service';
import { IndicatorTransactionService } from './services/indicator-transaction.service';

@Module({
  controllers: [],
  providers: [Logger, IndicatorDataSourceService, IndicatorTransactionService],
  imports: [],
  exports: [IndicatorDataSourceService, IndicatorTransactionService],
})
export class IntegrationModule {}
