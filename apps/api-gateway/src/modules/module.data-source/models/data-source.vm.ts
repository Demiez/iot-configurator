import { keys, pick } from 'lodash';
import { IDataSource } from '~iotcon-models';

export class DataSourceViewModel {
  constructor(body: IDataSource) {
    const pickedBody = pick(body, keys(body));

    Object.assign(this, pickedBody);
  }
}
