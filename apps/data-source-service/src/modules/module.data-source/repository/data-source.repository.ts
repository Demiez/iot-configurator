import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCodes } from '~iotcon-errors';
import { DataSourceDataModel, IDataSource } from '~iotcon-models';
import { NotFoundRpcError } from '../../../core/errors/rpc-errors';
import { DataSource, DataSourceDocument } from '../../module.db/schemas';

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
