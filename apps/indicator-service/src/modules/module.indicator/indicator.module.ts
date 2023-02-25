import { Logger, Module } from '@nestjs/common';
import { ValidationModule } from '../module.validation/validation.module';
import { IndicatorController } from './indicator.controller';
import { IndicatorSettingsService } from './services/indicator-settings.service';
import { IndicatorService } from './services/indicator.service';

@Module({
  controllers: [IndicatorController],
  providers: [Logger, IndicatorService, IndicatorSettingsService],
  imports: [ValidationModule],
  exports: [IndicatorService],
})
export class IndicatorModule {}
