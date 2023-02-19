import { DataSourceTypesEnum } from '../proto/datasource';
import {
  EndiansEnum,
  IndicatorDto,
  IndicatorSourceDto,
  RegisterTypesEnum,
  RmqExchangeTypesEnum,
  SubscriptionModesEnum,
  TypeValuesEnum,
} from '../proto/indicator';

function mapSource(source: IndicatorSourceDto) {
  if (source.dataSourceType) {
    source.dataSourceType = DataSourceTypesEnum[
      source.dataSourceType
    ] as unknown as DataSourceTypesEnum;
  }

  if (source.exchangeType) {
    source.exchangeType = RmqExchangeTypesEnum[
      source.exchangeType
    ] as unknown as RmqExchangeTypesEnum;
  }

  if (source.modbusData) {
    if (source.modbusData.registerType) {
      source.modbusData.registerType = RegisterTypesEnum[
        source.modbusData.registerType
      ] as unknown as RegisterTypesEnum;
    }
    if (source.modbusData.typeValue) {
      source.modbusData.typeValue = TypeValuesEnum[
        source.modbusData.typeValue
      ] as unknown as TypeValuesEnum;
    }
    if (source.modbusData.endian) {
      source.modbusData.endian = EndiansEnum[
        source.modbusData.endian
      ] as unknown as EndiansEnum;
    }
  }

  if (source.subscriptionMode) {
    source.subscriptionMode = SubscriptionModesEnum[
      source.subscriptionMode
    ] as unknown as SubscriptionModesEnum;
  }
}

export function mapIndicator(indicator: IndicatorDto) {
  if (indicator.root) {
    mapSource(indicator.root);
  }

  if (indicator.targets && indicator.targets.length > 0) {
    indicator.targets.forEach((target) => mapSource(target));
  }
}
