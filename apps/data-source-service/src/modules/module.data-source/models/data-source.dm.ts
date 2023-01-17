import {
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '~iotcon-models';
import { IDataSource } from '../../module.db/schemas';

export class DataSourceDataModel implements IDataSource {
  public id?: string;
  public name: string;
  public port: number;
  public type: DataSourceTypesEnum;
  public isDefault: boolean;
  public isPrimary: boolean;

  // insite specific
  public insiteServerAddress?: string;
  public bridgeId?: string;
  public logLevel?: InsiteLogLevelEnum;

  // mqtt specific
  public mqttServerAddress?: string;

  //rmq specific
  public amqpServerAddress?: string;

  // modbus specific
  public slaveId?: string;
  public modbusIpAddress?: string;

  // opcua specific
  public opcuaServerAddress?: string;
  public domainName?: string;
  public messageSecurityMode?: number;
  public securityPolicy?: SecurityPolicyEnum;
  public certificate?: string;

  // wits0 specific
  public baudRate?: number;
  public dataBits?: number;
  public stopBits?: number;
  public parity?: number;
  public readTimeoutSeconds?: number;
  public heartBeatInterval?: number;
  public heartBeatValue?: string;
  public packetHeader?: string;
  public packetFooter?: string;
  public lineSeparator?: string;
  public outputRaw?: boolean;

  constructor(dataSource: IDataSource) {
    const { _id, name, port, type, isDefault, isPrimary } = dataSource;

    if (_id) {
      this.id = _id;
    }

    this.name = name;
    this.port = port;
    this.type = type;
    this.isDefault = !!isDefault;
    this.isPrimary = !!isPrimary;

    switch (this.type) {
      case DataSourceTypesEnum.INSITE: {
        const { insiteServerAddress, bridgeId, logLevel } = dataSource;

        this.insiteServerAddress = insiteServerAddress;
        this.bridgeId = bridgeId;
        this.logLevel = logLevel;

        break;
      }
      case DataSourceTypesEnum.MQTT: {
        this.mqttServerAddress = dataSource.mqttServerAddress;

        break;
      }
      case DataSourceTypesEnum.RMQ: {
        this.amqpServerAddress = dataSource.amqpServerAddress;

        break;
      }
      case DataSourceTypesEnum.MODBUS: {
        const { slaveId, modbusIpAddress } = dataSource;

        this.slaveId = slaveId;
        this.modbusIpAddress = modbusIpAddress;

        break;
      }
      case DataSourceTypesEnum.OPCUA: {
        const {
          opcuaServerAddress,
          domainName,
          messageSecurityMode,
          securityPolicy,
          certificate,
        } = dataSource;

        this.opcuaServerAddress = opcuaServerAddress;
        this.domainName = domainName;
        this.messageSecurityMode = messageSecurityMode;
        this.securityPolicy = securityPolicy;
        this.certificate = certificate;

        break;
      }
      case DataSourceTypesEnum.WITS0: {
        const {
          baudRate,
          dataBits,
          stopBits,
          parity,
          readTimeoutSeconds,
          heartBeatInterval,
          heartBeatValue,
          packetHeader,
          packetFooter,
          lineSeparator,
          outputRaw,
        } = dataSource;

        this.baudRate = baudRate;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
        this.parity = parity;
        this.readTimeoutSeconds = readTimeoutSeconds;
        this.heartBeatInterval = heartBeatInterval;
        this.heartBeatValue = heartBeatValue;
        this.packetHeader = packetHeader;
        this.packetFooter = packetFooter;
        this.lineSeparator = lineSeparator;
        this.outputRaw = !!outputRaw;

        break;
      }
    }
  }
}
