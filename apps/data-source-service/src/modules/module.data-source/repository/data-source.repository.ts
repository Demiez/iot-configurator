import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCodes } from '~iotcon-errors';
import { NotFoundRpcError } from '../../../core/errors/rpc-errors';
import {
  DataSource,
  DataSourceDocument,
  IDataSource,
} from '../../module.db/schemas';
import { DataSourceDataModel } from '../models';

@Injectable()
export class DataSourceRepository {
  constructor(
    @InjectModel(DataSource.name)
    private dataSourceModel: Model<DataSourceDocument>,
  ) {}

  public async saveDataSource(
    dataSourceData: DataSourceDataModel,
  ): Promise<DataSourceDocument> {
    const dataSource = new this.dataSourceModel(dataSourceData);

    return await dataSource.save();
  }

  public async tryFindDataSourceById(_id: string): Promise<IDataSource> {
    const dataSource = await this.dataSourceModel.findOne({ _id });

    if (!dataSource) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        'DataSource not found',
      ]);
    }

    return dataSource;
  }
}
