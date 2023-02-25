import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { indicatorModelFactory } from '../module.db/schemas';
import { IntegrationModule } from '../module.integration/integration.module';
import { ValidationModule } from '../module.validation/validation.module';
import { IndicatorController } from './indicator.controller';
import { IndicatorRepository } from './repository/indicator.repository';
import { IndicatorSettingsService } from './services/indicator-settings.service';
import { IndicatorService } from './services/indicator.service';

@Module({
  controllers: [IndicatorController],
  providers: [
    Logger,
    IndicatorService,
    IndicatorSettingsService,
    IndicatorRepository,
  ],
  imports: [
    MongooseModule.forFeatureAsync([indicatorModelFactory]),
    ValidationModule,
    IntegrationModule,
  ],
  exports: [IndicatorService],
})
export class IndicatorModule {}
