import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorCodes } from '~iotcon-errors';
import { DataSourceDataModel, DataSourceTypesEnum } from '~iotcon-models';
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

  public async findAllDataSources(): Promise<DataSourceDocument[]> {
    const dataSources = await this.dataSourceModel.find();

    return dataSources;
  }

  public async findDataSourcesByTypes(
    types: DataSourceTypesEnum[],
    isDefault: boolean,
  ): Promise<DataSourceDocument[]> {
    const dataSources = await this.dataSourceModel.find({
      type: { $in: types },
      isDefault,
    });

    return dataSources;
  }

  public async findDataSourceById(_id: string): Promise<DataSourceDocument> {
    return await this.dataSourceModel.findOne({ _id });
  }

  public async tryFindDataSourceById(_id: string): Promise<DataSourceDocument> {
    const dataSource = await this.findDataSourceById(_id);

    if (!dataSource) {
      throw new NotFoundRpcError(ErrorCodes.RECORD_NOT_FOUND, [
        'DataSource not found',
      ]);
    }

    return dataSource;
  }

  public async findDataSourcesByIds(
    ids: string[],
  ): Promise<DataSourceDocument[]> {
    const dataSources = await this.dataSourceModel.find({
      _id: { $in: ids },
    });

    return dataSources;
  }

  public async deleteDataSourcesById(
    ids: string[],
  ): Promise<DataSourceDocument[]> {
    const dataSources = await this.dataSourceModel.find({
      _id: { $in: ids },
    });

    return dataSources;
  }
}
