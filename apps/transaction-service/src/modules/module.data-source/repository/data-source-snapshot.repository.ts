import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataSourceSnapshotDataModel } from '~iotcon-models';
import {
  DataSourceSnapshot,
  DataSourceSnapshotDocument,
  IDataSourceSnapshotDocument,
} from '../../module.db/schemas';

@Injectable()
export class DataSourceSnapshotRepository {
  constructor(
    @InjectModel(DataSourceSnapshot.name)
    private dataSourceSnapshotModel: Model<DataSourceSnapshotDocument>,
  ) {}

  public async getDataSourceSnapshotById(
    _id: string,
  ): Promise<IDataSourceSnapshotDocument> {
    return await this.dataSourceSnapshotModel.findOne({ _id });
  }

  public async saveDataSourceSnapshot(
    snapshotData: DataSourceSnapshotDataModel,
  ): Promise<IDataSourceSnapshotDocument> {
    const dataSourceSnapshot = new this.dataSourceSnapshotModel(snapshotData);

    return await dataSourceSnapshot.save();
  }
}
