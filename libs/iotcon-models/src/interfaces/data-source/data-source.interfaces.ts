import { DataSourceDto, DataSourceId } from '~iotcon-proto';
import {
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '../../enums';
import { IIdentifier } from '../core';

export interface IDataSourceId extends DataSourceId {}

export interface IDataSourceDto extends DataSourceDto {}

export interface IDataSource extends IIdentifier, IDataSourceDto {
  name: string;
  port: number;
  type: DataSourceTypesEnum;
  isDefault: boolean;
  isPrimary: boolean;

  // insite specific
  insiteServerAddress?: string;
  bridgeId?: string;
  logLevel?: InsiteLogLevelEnum;

  // mqtt specific
  mqttServerAddress?: string;

  //rmq specific
  amqpServerAddress?: string;

  // modbus specific
  slaveId?: string;
  modbusIpAddress?: string;

  // opcua specific
  opcuaServerAddress?: string;
  domainName?: string;
  messageSecurityMode?: number;
  securityPolicy?: SecurityPolicyEnum;
  certificate?: string;

  // wits0 specific
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
