import { keys, pick } from 'lodash';
import { DataSourceTypesEnum } from '~iotcon-models';
import { IDataSourceDto } from '~iotcon-proto';
import { DataSourceTypesBaseModel } from './abstract/data-source-types.bm';

// export class DataSourceRequestModel implements IDataSourceDto {
//   public id?: string = undefined;
//   public name: string = undefined;
//   public port: number = undefined;
//   public type: DataSourceTypesEnum = undefined;
//   public isDefault: boolean = undefined;
//   public isPrimary: boolean = undefined;

//   // insite
//   public insiteServerAddress?: string;
//   public bridgeId?: string;
//   public logLevel?: InsiteLogLevelEnum;

//   // mqtt
//   public mqttServerAddress?: string;

//   // rmq
//   public amqpServerAddress?: string;

//   // modbus
//   public slaveId?: string;
//   public modbusIpAddress?: string;

//   // opcua
//   public opcuaServerAddress?: string;
//   public domainName?: string;
//   public messageSecurityMode?: number;
//   public securityPolicy?: SecurityPolicyEnum;
//   public certificate?: string;

//   // wits0
//   public baudRate?: number;
//   public dataBits?: number;
//   public stopBits?: number;
//   public parity?: number;
//   public readTimeoutSeconds?: number;
//   public heartBeatInterval?: number;
//   public heartBeatValue?: string;
//   public packetHeader?: string;
//   public packetFooter?: string;
//   public lineSeparator?: string;
//   public outputRaw?: boolean;
// }

export class DataSourceRequestModel extends DataSourceTypesBaseModel {
  public id?: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;

  constructor(dataSourceData: IDataSourceDto) {
    super();
    const pickedBody = pick(dataSourceData, keys(dataSourceData));

    Object.assign(this, pickedBody);
  }
}
