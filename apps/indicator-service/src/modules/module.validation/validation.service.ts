import { Injectable } from '@nestjs/common';
import { FieldIsBadModel } from '~iotcon-errors';
import {
  DataSourceGenericDataModel,
  DefaultSettingsDataModel,
  IndicatorDataModel,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import {
  IndicatorModuleValidator,
  DataSourceToSensorValidator,
  DataSourcesToPublishersValidator,
} from './validators';

@Injectable()
export class ValidationService {
  public validateIndicatorModule(
    indicatorData: IndicatorDataModel,
  ): FieldIsBadModel[] {
    return IndicatorModuleValidator.validate(indicatorData);
  }

  public validateDataSourceToSensor(
    dataSources: DataSourceGenericDataModel[],
    sensor: IndicatorModuleDataModel,
    isExternal: boolean,
    disableModbusDataValidation?: boolean,
  ): FieldIsBadModel[] {
    return DataSourceToSensorValidator.validate(
      dataSources,
      sensor,
      isExternal,
      disableModbusDataValidation,
    );
  }

  public validateDataSourcesToPublishers(
    dataSources: DataSourceGenericDataModel[],
    publishers: IndicatorModuleDataModel[],
    defaultSettings: DefaultSettingsDataModel,
    disableModbusDataValidation?: boolean,
  ): FieldIsBadModel[] {
    return DataSourcesToPublishersValidator.validate(
      dataSources,
      publishers,
      defaultSettings,
      disableModbusDataValidation,
    );
  }
}
