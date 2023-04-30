import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { ISensor, SubscriptionModesEnum } from '~iotcon-models';

@Schema({
  toObject: {
    virtuals: true,
    getters: true,
  },
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
class Sensor implements ISensor {
  @Prop({ default: () => v4() })
  _id: string;
  @Prop({ type: String, required: true })
  dataSourceId: string;

  @Prop({ type: String })
  record?: string;
  @Prop({ type: String })
  descriptor?: string;
  @Prop({ type: Boolean })
  isWellBased?: boolean;

  @Prop({ type: String })
  mqttTopic?: string;

  @Prop({ type: String, enum: SubscriptionModesEnum })
  subscriptionMode?: SubscriptionModesEnum;

  @Prop({ type: String })
  rmqSettingsId?: string;
  @Prop({ type: String })
  routingKey?: string;

  @Prop({ type: String })
  modbusSampleRate?: number;
  @Prop({ type: Boolean })
  modbusReadBlocksData?: boolean;

  @Prop({ type: String })
  wits0SampleRate?: number;
  @Prop({ type: Boolean })
  wits0Direction?: boolean;

  // special fields
  @Prop()
  _created: Date;
  @Prop()
  _updated: Date;
}

interface ISensorDocument extends ISensor, HydratedDocument<Sensor> {
  _id: string;
  _created: Date;
  _updated: Date;
}

type SensorDocument = HydratedDocument<Sensor>;
const SensorSchema = SchemaFactory.createForClass(Sensor);

SensorSchema.index(
  { record: 1, descriptor: 1, isWellBased: 1 },
  { unique: false },
);

SensorSchema.index({ mqttTopic: 1 }, { unique: false });

const sensorModelFactory: AsyncModelFactory = {
  name: Sensor.name,
  useFactory: () => {
    const schema = SensorSchema;

    schema.pre('save', function (next) {
      const modelData = this as SensorDocument;
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

export {
  Sensor,
  ISensorDocument,
  SensorDocument,
  SensorSchema,
  sensorModelFactory,
};
