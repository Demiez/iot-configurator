import { keys, pick } from 'lodash';
import {
  DataSourceTypesBaseModel,
  DataSourceTypesEnum,
  IDataSource,
} from '~iotcon-models';

export class DataSourceRequestModel extends DataSourceTypesBaseModel {
  public id?: string = undefined;
  public name: string = undefined;
  public port: number = undefined;
  public type: DataSourceTypesEnum = undefined;
  public isDefault: boolean = undefined;
  public isPrimary: boolean = undefined;

  constructor(body: IDataSource) {
    super();
    const pickedBody = pick(body, keys(body));

    Object.assign(this, pickedBody);
  }
}
