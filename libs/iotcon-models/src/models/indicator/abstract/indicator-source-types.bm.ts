import { utils } from '~iotcon-sdk';
import { InsiteSourceBaseModel } from './insite-source.bm';
import { ModbusSourceBaseModel } from './modbus-source.bm';
import { MqttSourceBaseModel } from './mqtt-source.bm';
import { OpcuaSourceBaseModel } from './opcua-source.bm';
import { RmqSourceBaseModel } from './rmq-source.bm';
import { Wits0SourceBaseModel } from './wits0-source.bm';

interface IndicatorSourceTypesBaseModel
  extends InsiteSourceBaseModel,
    MqttSourceBaseModel,
    OpcuaSourceBaseModel,
    RmqSourceBaseModel,
    ModbusSourceBaseModel,
    Wits0SourceBaseModel {}

abstract class IndicatorSourceTypesBaseModel {
  public sourceName: string = undefined;
}

utils.applyMixins(IndicatorSourceTypesBaseModel, [
  InsiteSourceBaseModel,
  MqttSourceBaseModel,
  OpcuaSourceBaseModel,
  RmqSourceBaseModel,
  ModbusSourceBaseModel,
  Wits0SourceBaseModel,
]);

export { IndicatorSourceTypesBaseModel };
