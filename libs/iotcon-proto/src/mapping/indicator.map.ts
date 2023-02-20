import { DataSourceTypesEnum } from '../proto/datasource';
import {
  EndiansEnum,
  IndicatorDto,
  IndicatorModuleDto,
  RegisterTypesEnum,
  RmqExchangeTypesEnum,
  SubscriptionModesEnum,
  TypeValuesEnum,
} from '../proto/indicator';

function mapModule(module: IndicatorModuleDto) {
  if (module.dataSourceType) {
    module.dataSourceType = DataSourceTypesEnum[
      module.dataSourceType
    ] as unknown as DataSourceTypesEnum;
  }

  if (module.exchangeType) {
    module.exchangeType = RmqExchangeTypesEnum[
      module.exchangeType
    ] as unknown as RmqExchangeTypesEnum;
  }

  if (module.modbusData) {
    if (module.modbusData.registerType) {
      module.modbusData.registerType = RegisterTypesEnum[
        module.modbusData.registerType
      ] as unknown as RegisterTypesEnum;
    }
    if (module.modbusData.typeValue) {
      module.modbusData.typeValue = TypeValuesEnum[
        module.modbusData.typeValue
      ] as unknown as TypeValuesEnum;
    }
    if (module.modbusData.endian) {
      module.modbusData.endian = EndiansEnum[
        module.modbusData.endian
      ] as unknown as EndiansEnum;
    }
  }

  if (module.subscriptionMode) {
    module.subscriptionMode = SubscriptionModesEnum[
      module.subscriptionMode
    ] as unknown as SubscriptionModesEnum;
  }
}

export function mapIndicator(indicator: IndicatorDto) {
  if (indicator.sensor) {
    mapModule(indicator.sensor);
  }

  if (indicator.publishers && indicator.publishers.length > 0) {
    indicator.publishers.forEach((publisher) => mapModule(publisher));
  }
}
