import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import {
  IPublisherTarget,
  IVariable,
  IVariableModbusData,
} from '~iotcon-models';
import { PublisherTargetSchema } from './nested/publisher-target.schema';
import { VariableModbusDataSchema } from './nested/variable-modbus-data.schema';

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
class Variable implements IVariable {
  @Prop({ default: () => v4() })
  _id: string;
  @Prop({ type: String, required: true })
  sensorId: string;
  @Prop({ type: [PublisherTargetSchema], required: true })
  publisherTargets: IPublisherTarget[];
  @Prop({ type: String })
  variableName?: string;
  @Prop({ type: String })
  uom?: string;
  @Prop({ type: String })
  uoc?: string;
  @Prop({ type: VariableModbusDataSchema })
  modbusData?: IVariableModbusData;
  @Prop({ type: String })
  variableId?: string;
}

interface IVariableDocument extends IVariable, HydratedDocument<Variable> {
  _id: string;
}

type VariableDocument = HydratedDocument<Variable>;
const VariableSchema = SchemaFactory.createForClass(Variable);

VariableSchema.index({ variableName: 1 }, { unique: false });

const variableModelFactory: AsyncModelFactory = {
  name: Variable.name,
  useFactory: () => {
    const schema = VariableSchema;

    schema.pre('save', function (next) {
      const variableData = this as VariableDocument;

      if (!isEmpty(variableData.publisherTargets)) {
        variableData.markModified('publisherTargets');
      }

      return next();
    });

    return schema;
  },
};

export {
  Variable,
  IVariableDocument,
  VariableDocument,
  VariableSchema,
  variableModelFactory,
};
