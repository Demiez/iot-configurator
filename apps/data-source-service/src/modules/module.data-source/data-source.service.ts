import { Injectable } from '@nestjs/common';
import {
  DataSourceDataModel,
  DataSourceIdDataModel,
  DataSourcesDataModel,
  IDataSourcesByTypes,
  IDataSourcesIds,
} from '~iotcon-models';
import { DataSourceRepository } from './repository/data-source.repository';
import { join } from 'path';
import process from 'process';
import { readFileSync } from 'fs';

@Injectable()
export class DataSourceService {
  constructor(private readonly dataSourceRepository: DataSourceRepository) {}

  public async createDataSource(
    dataSourceData: DataSourceDataModel,
  ): Promise<DataSourceIdDataModel> {
    const dataSource = await this.dataSourceRepository.saveDataSource(
      dataSourceData,
    );

    return new DataSourceIdDataModel(dataSource._id);
  }

  public async getDataSourceById(
    dataSourceId: string,
  ): Promise<DataSourceDataModel> {
    const dataSource = await this.dataSourceRepository.tryFindDataSourceById(
      dataSourceId,
    );

    return new DataSourceDataModel(dataSource);
  }

  public async getAllDataSources(): Promise<DataSourcesDataModel> {
    const dataSources = await this.dataSourceRepository.findAllDataSources();

    return new DataSourcesDataModel(dataSources.length, dataSources);
  }

  public async getDataSourcesByTypes(
    request: IDataSourcesByTypes,
  ): Promise<DataSourcesDataModel> {
    const { types, isDefault } = request;

    const dataSources = await this.dataSourceRepository.findDataSourcesByTypes(
      types,
      isDefault,
    );

    return new DataSourcesDataModel(dataSources.length, dataSources);
  }

  public async getDataSourcesByIds(
    request: IDataSourcesIds,
  ): Promise<DataSourcesDataModel> {
    const dataSources = await this.dataSourceRepository.findDataSourcesByIds(
      request.ids,
    );

    return new DataSourcesDataModel(dataSources.length, dataSources);
  }

  public async deleteDataSourceById(dataSourceId: string): Promise<void> {
    await this.dataSourceRepository.deleteDataSourceById(dataSourceId);
  }

  public async deleteAllDataSources(): Promise<void> {
    await this.dataSourceRepository.deleteAllDataSources();
  }

  public async seedDataSources(): Promise<DataSourcesDataModel> {
    const seedFilePath = join(
      process.cwd(),
      '/seed-data/data-sources.seed-data.json',
    );

    const dataSourcesData: DataSourceDataModel[] = JSON.parse(
      readFileSync(seedFilePath).toString(),
    );
    const dataSourcesIds = dataSourcesData.map(
      (dataSourceData) => dataSourceData._id,
    );

    await this.dataSourceRepository.insertManyDataSources(dataSourcesData);

    return await this.getDataSourcesByIds({ ids: dataSourcesIds });
  }
}
