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
    private DataSourceModel: Model<DataSourceDocument>,
  ) {}

  public async saveDataSource(
    dataSourceData: DataSourceDataModel,
  ): Promise<DataSourceDocument> {
    const dataSource = new this.DataSourceModel(dataSourceData);

    return await dataSource.save();
  }

  public async findAllDataSources(): Promise<DataSourceDocument[]> {
    const dataSources = await this.DataSourceModel.find();

    return dataSources;
  }

  public async findDataSourcesByTypes(
    types: DataSourceTypesEnum[],
    isDefault: boolean,
  ): Promise<DataSourceDocument[]> {
    const dataSources = await this.DataSourceModel.find({
      type: { $in: types },
      isDefault,
    });

    return dataSources;
  }

  public async findDataSourceById(_id: string): Promise<DataSourceDocument> {
    return await this.DataSourceModel.findOne({ _id });
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
    const dataSources = await this.DataSourceModel.find({
      _id: { $in: ids },
    });

    return dataSources;
  }

  public async deleteDataSourceById(_id: string): Promise<unknown> {
    const dataSource = await this.DataSourceModel.findOne({
      _id,
    });

    if (!dataSource) {
      return;
    }

    return await dataSource.deleteOne();
  }

  public async deleteAllDataSources(): Promise<unknown> {
    return await this.DataSourceModel.deleteMany();
  }

  public async insertManyDataSources(
    dataSources: DataSourceDataModel[],
  ): Promise<void> {
    try {
      await this.DataSourceModel.insertMany(dataSources, {
        ordered: false,
      });
    } catch (error) {
      if (error.code !== 11000) {
        throw error;
      }
    }
  }
}
