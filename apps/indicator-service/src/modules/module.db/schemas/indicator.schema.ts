import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { IIndicatorDocument, ISourceData } from '~iotcon-models';
import { SourceDataSchema } from './source-data.schema';

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
class Indicator implements IIndicatorDocument {
  @Prop({ default: () => v4() })
  _id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Boolean, required: true })
  isExternal: boolean;
  @Prop({ type: String })
  description?: string;
  @Prop({ type: String })
  group?: string;
  @Prop({ type: [String], default: [] })
  publishersIds: string[];
  @Prop({ type: SourceDataSchema })
  sourceData?: ISourceData;
  @Prop({ type: [{ type: String, trim: true }], default: [] })
  tags: string[];

  // special fields
  @Prop()
  _created: Date;
  @Prop()
  _updated: Date;
}

type IndicatorDocument = HydratedDocument<Indicator>;
const IndicatorSchema = SchemaFactory.createForClass(Indicator);

IndicatorSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);

const indicatorModelFactory: AsyncModelFactory = {
  name: Indicator.name,
  useFactory: () => {
    const schema = IndicatorSchema;

    schema.pre('save', function (next) {
      const modelData = this as IndicatorDocument;
      const eventDate = new Date();

      if (modelData.isNew) {
        modelData._created = eventDate;
      }

      modelData._updated = eventDate;

      modelData.markModified('tags');
      modelData.markModified('publishersIds');

      return next();
    });

    return schema;
  },
};

export { Indicator, IndicatorDocument, IndicatorSchema, indicatorModelFactory };
