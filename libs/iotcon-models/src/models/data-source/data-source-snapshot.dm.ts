import { DataSourceTypesEnum } from '../../enums';
import { IDataSourceSnapshot } from '../../interfaces';
import { Identifier } from '../core';

export class DataSourceSnapshotDataModel
  extends Identifier
  implements IDataSourceSnapshot
{
  public type: DataSourceTypesEnum;
  public databusKey: string;
  public isVirtual: boolean;

  constructor(snapshotData: IDataSourceSnapshot) {
    super();

    this.populateIds(snapshotData);

    const { type, databusKey, isVirtual } = snapshotData;

    this.type = type;
    this.databusKey = databusKey;
    this.isVirtual = isVirtual;
  }

  public static _initializeForCache(
    type: DataSourceTypesEnum,
    databusKey: string,
    isVirtual: boolean = false
  ) {
    return new DataSourceSnapshotDataModel({
      type,
      databusKey,
      isVirtual,
    });
  }
}
