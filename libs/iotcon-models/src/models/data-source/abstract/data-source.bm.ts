import { InsiteLogLevelEnum, SecurityPolicyEnum } from '../../../enums';

export abstract class InsiteDataSourceBaseModel {
  public insiteServerAddress?: string = undefined;
  public bridgeId?: string = undefined;
  public logLevel?: InsiteLogLevelEnum = undefined;
}

export abstract class MqttDataSourceBaseModel {
  public mqttServerAddress?: string = undefined;
}

export abstract class RmqDataSourceBaseModel {
  public amqpServerAddress?: string = undefined;
}

export abstract class ModbusDataSourceBaseModel {
  public slaveId?: string = undefined;
  public modbusIpAddress?: string = undefined;
}

export abstract class OpcuaDataSourceBaseModel {
  public opcuaServerAddress?: string = undefined;
  public domainName?: string = undefined;
  public messageSecurityMode?: number = undefined;
  public securityPolicy?: SecurityPolicyEnum = undefined;
  public certificate?: string = undefined;
}

export abstract class Wits0DataSourceBaseModel {
  public baudRate?: number = undefined;
  public dataBits?: number = undefined;
  public stopBits?: number = undefined;
  public parity?: number = undefined;
  public readTimeoutSeconds?: number = undefined;
  public heartBeatInterval?: number = undefined;
  public heartBeatValue?: string = undefined;
  public packetHeader?: string = undefined;
  public packetFooter?: string = undefined;
  public lineSeparator?: string = undefined;
  public outputRaw?: boolean = undefined;
}
