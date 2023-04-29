import {
  DataSourceTypesEnum,
  InsiteLogLevelEnum,
  SecurityPolicyEnum,
} from '../../enums';
import { IDataSourceSnapshot } from '../../interfaces';
import { Identifier } from '../core';

export class DataSourceSnapshotDataModel
  extends Identifier
  implements IDataSourceSnapshot
{
  public type: DataSourceTypesEnum;
  public databusKey: string;
  public isVirtual: boolean;

  public static _initializeForCache(
    type: DataSourceTypesEnum,
    databusKey: string,
    isVirtual: boolean = false
  ) {
    const instance = new DataSourceSnapshotDataModel();

    instance.type = type;
    instance.databusKey = databusKey;
    instance.isVirtual = isVirtual;
  }
}
