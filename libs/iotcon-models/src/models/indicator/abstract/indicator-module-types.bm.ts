import { utils } from '~iotcon-sdk';
import { InsiteModuleBaseModel } from './insite-module.bm';
import { ModbusModuleBaseModel } from './modbus-module.bm';
import { MqttModuleBaseModel } from './mqtt-module.bm';
import { OpcuaModuleBaseModel } from './opcua-module.bm';
import { RmqModuleBaseModel } from './rmq-module.bm';
import { Wits0ModuleBaseModel } from './wits0-module.bm';

interface IndicatorModuleTypesBaseModel
  extends InsiteModuleBaseModel,
    MqttModuleBaseModel,
    OpcuaModuleBaseModel,
    RmqModuleBaseModel,
    ModbusModuleBaseModel,
    Wits0ModuleBaseModel {}

abstract class IndicatorModuleTypesBaseModel {
  public sourceName?: string = undefined;
}

utils.applyMixins(IndicatorModuleTypesBaseModel, [
  InsiteModuleBaseModel,
  MqttModuleBaseModel,
  OpcuaModuleBaseModel,
  RmqModuleBaseModel,
  ModbusModuleBaseModel,
  Wits0ModuleBaseModel,
]);

export { IndicatorModuleTypesBaseModel };
