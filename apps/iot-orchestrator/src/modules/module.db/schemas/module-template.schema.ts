import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { ITemplate } from '~iotcon-models';

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
export class ModuleTemplate implements ITemplate {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ required: true })
  version: number;
  @Prop({ required: true })
  templateId: string;
  @Prop({ required: true })
  config: string;
}

type ModuleTemplateDocument = HydratedDocument<ModuleTemplate>;
const ModuleTemplateSchema = SchemaFactory.createForClass(ModuleTemplate);

const moduleTemplateModelFactory: AsyncModelFactory = {
  name: ModuleTemplate.name,
  useFactory: () => {
    const schema = ModuleTemplateSchema;

    return schema;
  },
};

export {
  ModuleTemplateDocument,
  ModuleTemplateSchema,
  moduleTemplateModelFactory,
};
