import {
  AsyncModelFactory,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 } from 'uuid';
import { DataSourceTypesEnum, IDataSourceSnapshot } from '~iotcon-models';

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
export class DataSourceSnapshot implements IDataSourceSnapshot {
  @Prop({ default: v4() })
  _id: string;
  @Prop({ type: String, enum: DataSourceTypesEnum, required: true })
  type: DataSourceTypesEnum;
  @Prop({ required: true })
  databusKey: string;
  @Prop({ required: true })
  isVirtual: boolean;
}

interface IDataSourceSnapshotDocument
  extends IDataSourceSnapshot,
    HydratedDocument<DataSourceSnapshot> {
  _id: string;
}

type DataSourceSnapshotDocument = HydratedDocument<DataSourceSnapshot>;
const DataSourceSnapshotSchema =
  SchemaFactory.createForClass(DataSourceSnapshot);

DataSourceSnapshotSchema.index({ databusKey: 1 }, { unique: true });

const dataSourceSnapshotModelFactory: AsyncModelFactory = {
  name: DataSourceSnapshot.name,
  useFactory: () => {
    const schema = DataSourceSnapshotSchema;

    return schema;
  },
};

export {
  IDataSourceSnapshotDocument,
  DataSourceSnapshotDocument,
  DataSourceSnapshotSchema,
  dataSourceSnapshotModelFactory,
};
