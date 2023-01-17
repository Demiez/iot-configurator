import { keys, pick } from 'lodash';
import { DataSourceTypesEnum } from '~iotcon-models';
import { IDataSourceDto } from '~iotcon-proto';
import { DataSourceTypesBaseModel } from './abstract/data-source-types.bm';

export class DataSourceRequestModel extends DataSourceTypesBaseModel {
  public id?: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;

  constructor(dataSourceData: IDataSourceDto) {
    super();
    const pickedBody = pick(dataSourceData, keys(dataSourceData));

    Object.assign(this, pickedBody);
  }
}
