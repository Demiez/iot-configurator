import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { v4 } from 'uuid';
import { IBriefOperation, OperationModesEnum } from '~iotcon-models';

@Schema({ _id: false })
export class BriefOperation implements IBriefOperation {
  @Prop({ type: String, enum: OperationModesEnum, required: true })
  mode: OperationModesEnum;
  @Prop({ required: true })
  moduleId: string;
}

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
export class TransactionLog {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ required: true })
  isComplete: boolean;
  @Prop({ type: MongooseSchema.Types.Array, required: true })
  operations: BriefOperation[];

  // special fields
  @Prop()
  _created: Date;
}

type TransactionLogDocument = HydratedDocument<TransactionLog>;
const TransactionLogSchema = SchemaFactory.createForClass(TransactionLog);

const transactionLogModelFactory: AsyncModelFactory = {
  name: TransactionLog.name,
  useFactory: () => {
    const schema = TransactionLogSchema;

    schema.pre('save', function (next) {
      const modelData = this as TransactionLogDocument;
      const eventDate = new Date();

      if (modelData.isNew) {
        modelData._created = eventDate;
      }

      return next();
    });

    return schema;
  },
};

export {
  TransactionLogDocument,
  TransactionLogSchema,
  transactionLogModelFactory,
};
