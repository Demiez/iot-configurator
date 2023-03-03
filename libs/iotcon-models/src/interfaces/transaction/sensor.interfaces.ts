import {
  IInsiteConnector,
  IModbusConnector,
  IMqttConnector,
  IOpcuaConnector,
  IRmqConnector,
  IWits0Connector,
} from './data-source-specific';

export interface ISensor
  extends IInsiteConnector,
    IMqttConnector,
    IOpcuaConnector,
    IRmqConnector,
    IModbusConnector,
    IWits0Connector {
  dataSourceId: string;
  _id?: string;
  _created?: Date;
  _updated?: Date;
}
