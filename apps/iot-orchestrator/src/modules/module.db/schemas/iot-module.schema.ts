import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';

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
export class IotModule {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ required: true })
  config: string;

  // special fields
  @Prop()
  _created: Date;
  @Prop()
  _updated: Date;
}

type IotModuleDocument = HydratedDocument<IotModule>;
const IotModuleSchema = SchemaFactory.createForClass(IotModule);

const iotModuleModelFactory: AsyncModelFactory = {
  name: IotModule.name,
  useFactory: () => {
    const schema = IotModuleSchema;

    schema.pre('save', function (next) {
      const modelData = this as IotModuleDocument;
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

export { IotModuleDocument, IotModuleSchema, iotModuleModelFactory };
