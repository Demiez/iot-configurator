import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DataSourceSnapshot,
  DataSourceSnapshotDocument,
} from '../../module.db/schemas';

@Injectable()
export class DataSourceSnapshotRepository {
  constructor(
    @InjectModel(DataSourceSnapshot.name)
    private dataSourceSnapshotModel: Model<DataSourceSnapshotDocument>,
  ) {}

  public async getDataSourceSnapshotById(
    _id: string,
  ): Promise<DataSourceSnapshotDocument> {
    return await this.dataSourceSnapshotModel.findOne({ _id });
  }
}
