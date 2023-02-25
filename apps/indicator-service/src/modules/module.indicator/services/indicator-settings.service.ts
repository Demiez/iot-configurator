import { Injectable, Logger } from '@nestjs/common';
import { DefaultSettingsDataModel, IDefaultSettings } from '~iotcon-models';

// this service is supposed to populate default settings data to DB capped collection + manage appropriate caching
// TODO: substitute mock service to correct functionality
@Injectable()
export class IndicatorSettingsService {
  private defaultSettings: IDefaultSettings = new DefaultSettingsDataModel();

  constructor(private readonly logger: Logger) {}

  public retrieveDefaultSettings(): DefaultSettingsDataModel {
    this.logger.log('Retrieved mock default settings');

    return this.defaultSettings;
  }
}
