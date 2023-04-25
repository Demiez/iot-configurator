import { Document, Schema } from 'mongoose';
import { v4 } from 'uuid';
import { DataSourceTypesEnum, IDataSourceSnapshot } from '~iotcon-models';

interface IDataSourceSnapshotDocument extends IDataSourceSnapshot, Document {
  _id: string;
}

const dataSourceSnapshotSchema = new Schema<IDataSourceSnapshotDocument>({
  _id: {
    type: String,
    default: v4,
  },
  type: {
    type: String,
    enum: Object.values(DataSourceTypesEnum),
  },
  databusKey: {
    type: String,
  },
  isVirtual: {
    type: Boolean,
    default: false,
  },
});

dataSourceSnapshotSchema.index({ databusKey: 1 }, { unique: true });

export { IDataSourceSnapshotDocument, dataSourceSnapshotSchema };
