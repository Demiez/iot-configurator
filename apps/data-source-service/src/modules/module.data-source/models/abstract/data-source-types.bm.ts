import {
  InsiteDataSourceBaseModel,
  ModbusDataSourceBaseModel,
  MqttDataSourceBaseModel,
  OpcuaDataSourceBaseModel,
  RmqDataSourceBaseModel,
  Wits0DataSourceBaseModel,
} from './data-source.bm';
import { utils } from '~iotcon-sdk';

interface DataSourceTypesBaseModel
  extends InsiteDataSourceBaseModel,
    MqttDataSourceBaseModel,
    RmqDataSourceBaseModel,
    ModbusDataSourceBaseModel,
    OpcuaDataSourceBaseModel,
    Wits0DataSourceBaseModel {}

abstract class DataSourceTypesBaseModel {}

utils.applyMixins(DataSourceTypesBaseModel, [
  InsiteDataSourceBaseModel,
  MqttDataSourceBaseModel,
  RmqDataSourceBaseModel,
  ModbusDataSourceBaseModel,
  OpcuaDataSourceBaseModel,
  Wits0DataSourceBaseModel,
]);

export { DataSourceTypesBaseModel };
