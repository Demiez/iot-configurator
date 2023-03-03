import { ISensor } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { InsiteTransactionConfigDataModel } from './insite-transaction-config.dm';

export class InsiteSensorDataModel
  extends ConnectorBaseModel
  implements ISensor
{
  public insiteBridgeName: string;
  public record: string;
  public descriptor: string;
  public isWellBased: boolean;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<InsiteTransactionConfigDataModel>
  ) {
    super(moduleId, dataSourceId);

    const { record, descriptor, isWellBased } = config;

    this.record = record;
    this.descriptor = descriptor;
    this.isWellBased = isWellBased;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    record: string,
    descriptor: string,
    isWellBased: boolean
  ): InsiteSensorDataModel {
    return new this(moduleId, dataSourceId, {
      record,
      descriptor,
      isWellBased,
    });
  }
}
