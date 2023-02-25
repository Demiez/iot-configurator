import { Logger, Module } from '@nestjs/common';
import { IndicatorDataSourceService } from './services/indicator-data-source.service';

@Module({
  controllers: [],
  providers: [Logger, IndicatorDataSourceService],
  imports: [],
  exports: [IndicatorDataSourceService],
})
export class IntegrationModule {}
