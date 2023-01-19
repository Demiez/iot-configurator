import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import {
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '~iotcon-models';

export interface IDataSource {
  _id?: string;
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

@Schema()
export class DataSource implements IDataSource {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  port: number;
  @Prop({ type: String, enum: DataSourceTypesEnum, required: true })
  type: DataSourceTypesEnum;
  @Prop({ required: true })
  isDefault: boolean;
  @Prop({ required: true })
  isPrimary: boolean;

  // insite
  @Prop()
  insiteServerAddress: string;
  @Prop()
  bridgeId: string;
  @Prop({ type: String, enum: InsiteLogLevelEnum })
  logLevel: InsiteLogLevelEnum;

  // mqtt
  @Prop()
  mqttServerAddress: string;

  //rmq
  @Prop()
  amqpServerAddress: string;

  // modbus
  @Prop()
  slaveId: string;

  @Prop()
  modbusIpAddress: string;

  // opcua
  @Prop()
  opcuaServerAddress: string;

  @Prop()
  domainName: string;
  @Prop()
  messageSecurityMode: number;
  @Prop({ type: String, enum: SecurityPolicyEnum })
  securityPolicy: SecurityPolicyEnum;
  @Prop()
  certificate: string;

  // wits0
  @Prop()
  baudRate: number;
  @Prop()
  dataBits: number;
  @Prop()
  stopBits: number;
  @Prop()
  parity: number;
  @Prop()
  readTimeoutSeconds: number;
  @Prop()
  heartBeatInterval: number;
  @Prop()
  heartBeatValue: string;
  @Prop()
  packetHeader: string;
  @Prop()
  packetFooter: string;
  @Prop()
  lineSeparator: string;
  @Prop()
  outputRaw: boolean;

  // special fields
  @Prop()
  _created: Date;
  @Prop()
  _updated: Date;
}

type DataSourceDocument = HydratedDocument<DataSource>;
const DataSourceSchema = SchemaFactory.createForClass(DataSource);

DataSourceSchema.index({ type: 1 }, { unique: false });

const dataSourceModelFactory: AsyncModelFactory = {
  name: DataSource.name,
  useFactory: () => {
    const schema = DataSourceSchema;

    schema.pre('save', function (next) {
      const modelData = this as DataSourceDocument;
      const eventDate = new Date();

      if (modelData.isNew) {
        modelData._created = eventDate;
      }

      modelData._updated = eventDate;

      return next();
    });

    return schema;
  },
};

export { DataSourceDocument, DataSourceSchema, dataSourceModelFactory };
