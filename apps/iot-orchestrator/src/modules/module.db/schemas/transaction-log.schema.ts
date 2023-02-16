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
export class TransactionLog {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ required: true })
  isComplete: boolean;
  @Prop({ required: true })
  moduleId: string;

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
