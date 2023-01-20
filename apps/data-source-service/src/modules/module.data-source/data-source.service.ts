import { Injectable } from '@nestjs/common';
import { DataSourceDataModel, DataSourceIdDataModel } from '~iotcon-models';
import { DataSourceRepository } from './repository/data-source.repository';

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
}
