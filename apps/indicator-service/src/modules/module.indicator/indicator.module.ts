import { Logger, Module } from '@nestjs/common';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';

@Module({
  controllers: [IndicatorController],
  providers: [Logger, IndicatorService],
  imports: [],
  exports: [IndicatorService],
})
export class IndicatorModule {}
