import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { ISchema, ModuleTypesEnum } from '~iotcon-models';

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
export class ModuleSchema implements ISchema {
  @Prop({ default: () => v4() })
  _id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ type: String, enum: ModuleTypesEnum, required: true })
  type: ModuleTypesEnum;
  @Prop({ required: true })
  class: string;
  @Prop({ required: true })
  config: string;
}

type ModuleSchemaDocument = HydratedDocument<ModuleSchema>;
const ModuleSchemaSchema = SchemaFactory.createForClass(ModuleSchema);

const moduleSchemaModelFactory: AsyncModelFactory = {
  name: ModuleSchema.name,
  useFactory: () => {
    const schema = ModuleSchemaSchema;

    return schema;
  },
};

export { ModuleSchemaDocument, ModuleSchemaSchema, moduleSchemaModelFactory };
