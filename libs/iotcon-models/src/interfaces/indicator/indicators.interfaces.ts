import {
  IndicatorDto,
  IndicatorIdDto,
  IndicatorModuleDto,
  IndicatorsDto,
  VariableModbusDataDto,
} from '~iotcon-proto';
import {
  DataSourceTypesEnum,
  EndiansEnum,
  RegisterTypesEnum,
  RmqExchangeTypesEnum,
  SubscriptionModesEnum,
  TypeValuesEnum,
} from '../../enums';
import { IIdentifier } from '../core';

export interface IIndicatorId extends IndicatorIdDto {}

export interface IVariableModbusData extends VariableModbusDataDto {
  registerType: RegisterTypesEnum;
  typeValue: TypeValuesEnum;
  endian: EndiansEnum;
}

export interface IIndicatorModule extends IndicatorModuleDto {
  dataSourceType?: DataSourceTypesEnum;
  exchangeType?: RmqExchangeTypesEnum;
  modbusData?: IVariableModbusData;
  subscriptionMode?: SubscriptionModesEnum;
}

export interface IIndicator extends IIdentifier, IndicatorDto {
  sensor: IIndicatorModule;
  publishers: IIndicatorModule[];
}

export interface IIndicators extends IndicatorsDto {
  indicators: IIndicator[];
}
