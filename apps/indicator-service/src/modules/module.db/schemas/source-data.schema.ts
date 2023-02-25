import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  DataSourceTypesEnum,
  ISourceData,
  RmqExchangeTypesEnum,
} from '~iotcon-models';

@Schema({ _id: false })
class SourceData implements ISourceData {
  @Prop({ type: String })
  dataSourceId?: string;
  @Prop({ type: String, enum: DataSourceTypesEnum })
  dataSourceType: DataSourceTypesEnum;
  @Prop({ type: String })
  mqttTopic?: string;
  @Prop({ type: String })
  exchangeName?: string;
  @Prop({ type: String, enum: RmqExchangeTypesEnum })
  exchangeType?: RmqExchangeTypesEnum;
  @Prop({ type: Boolean })
  exchangeDurable?: boolean;
  @Prop({ type: String })
  routingKey?: string;
  @Prop({ type: String })
  variableName?: string;
  @Prop({ type: String })
  uom?: string;
  @Prop({ type: String })
  uoc?: string;
}

export const SourceDataSchema = SchemaFactory.createForClass(SourceData);
