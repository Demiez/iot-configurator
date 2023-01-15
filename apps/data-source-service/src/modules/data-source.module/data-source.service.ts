import { Injectable } from '@nestjs/common';
import { DataSourceRequestModel } from './models';
import { v4 } from 'uuid';

@Injectable()
export class DataSourceService {
  public async createDataSource(
    requestModel: DataSourceRequestModel,
  ): Promise<{ id: string }> {
    return { id: requestModel.type };
  }
}
