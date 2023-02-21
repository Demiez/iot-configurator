import { Logger, Module } from '@nestjs/common';
import { ValidationModule } from '../module.validation/validation.module';
import { IndicatorController } from './indicator.controller';
import { IndicatorService } from './indicator.service';

@Module({
  controllers: [IndicatorController],
  providers: [Logger, IndicatorService],
  imports: [ValidationModule],
  exports: [IndicatorService],
})
export class IndicatorModule {}
