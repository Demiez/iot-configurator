import {
  IndicatorDto,
  IndicatorIdDto,
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

export interface IIndicator extends IIdentifier, IndicatorDto {
  dataSourceType?: DataSourceTypesEnum;
  exchangeType?: RmqExchangeTypesEnum;
  modbusData?: IVariableModbusData;
  subscriptionMode?: SubscriptionModesEnum;
}

export interface IIndicators extends IndicatorsDto {
  indicators: IIndicator[];
}
