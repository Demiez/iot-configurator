import { IDataSourceDto } from '~iotcon-proto';
import {
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '~iotcon-models';

export class DataSourceRequestModel implements IDataSourceDto {
  public id?: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;

  // insite
  public insiteServerAddress?: string;
  public bridgeId?: string;
  public logLevel?: InsiteLogLevelEnum;

  // mqtt
  public mqttServerAddress?: string;

  // rmq
  public amqpServerAddress?: string;

  // modbus
  public slaveId?: string;
  public modbusIpAddress?: string;

  // opcua
  opcuaServerAddress?: string;
  domainName?: string;
  messageSecurityMode?: number;
  securityPolicy?: SecurityPolicyEnum;
  certificate?: string;

  // wits0
  baudRate?: number;
  dataBits?: number;
  stopBits?: number;
  parity?: number;
  readTimeoutSeconds?: number;
  heartBeatInterval?: number;
  heartBeatValue?: string;
  packetHeader?: string;
  packetFooter?: string;
  lineSeparator?: string;
  outputRaw?: boolean;
}
