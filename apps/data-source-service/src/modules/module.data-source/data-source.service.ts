import { Injectable } from '@nestjs/common';
import {
  DataSourceDataModel,
  DataSourceIdViewModel,
  DataSourceRequestModel,
} from './models';
import { DataSourceRepository } from './repository/data-source.repository';

@Injectable()
export class DataSourceService {
  constructor(private readonly dataSourceRepository: DataSourceRepository) {}

  public async createDataSource(
    requestModel: DataSourceRequestModel,
  ): Promise<DataSourceIdViewModel> {
    const dataSourceData = new DataSourceDataModel(requestModel);

    const dataSource = await this.dataSourceRepository.saveDataSource(
      dataSourceData,
    );

    return new DataSourceIdViewModel(dataSource._id);
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
