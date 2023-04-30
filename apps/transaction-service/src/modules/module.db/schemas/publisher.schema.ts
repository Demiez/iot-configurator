import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { IBaseVariable, IPublisher } from '~iotcon-models';
import { BaseVariableSchema } from './nested/base-variable.schema';

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
class Publisher implements IPublisher {
  @Prop({ default: () => v4() })
  _id: string;
  @Prop({ type: [String], default: [] })
  connectedSensorIds?: string[];
  @Prop({ type: String, required: true })
  dataSourceId: string;
  @Prop({ type: String, required: true })
  databusKey: string;

  @Prop({ type: [BaseVariableSchema] })
  variables?: IBaseVariable[];
  @Prop({ type: Boolean })
  isDefault?: boolean;

  @Prop({ type: String })
  mqttTopic?: string;

  @Prop({ type: String })
  rmqSettingsId?: string;
  @Prop({ type: String })
  routingKey?: string;

  @Prop({ type: String })
  record?: string;
  @Prop({ type: String })
  descriptor?: string;
  @Prop({ type: Boolean })
  isWellBased?: boolean;

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

interface IPublisherDocument extends IPublisher, HydratedDocument<Publisher> {
  _id: string;
  _created: Date;
  _updated: Date;
}

type PublisherDocument = HydratedDocument<Publisher>;
const PublisherSchema = SchemaFactory.createForClass(Publisher);

PublisherSchema.index({ connectedSensorIds: 1 }, { unique: false });

const publisherModelFactory: AsyncModelFactory = {
  name: Publisher.name,
  useFactory: () => {
    const schema = PublisherSchema;

    schema.pre('save', function (next) {
      const modelData = this as PublisherDocument;
      const eventDate = new Date();

      if (modelData.isNew) {
        modelData._created = eventDate;
      }

      modelData.markModified('variables');
      modelData._updated = eventDate;

      return next();
    });

    return schema;
  },
};

export {
  Publisher,
  IPublisherDocument,
  PublisherDocument,
  PublisherSchema,
  publisherModelFactory,
};
