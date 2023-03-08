import { ISensor, IWits0Subscription } from '../../../../interfaces';
import { ConnectorBaseModel } from '../../abstract';
import { Wits0TransactionConfigDataModel } from './wits0-transaction-config.dm';

export class Wits0SensorDataModel
  extends ConnectorBaseModel
  implements ISensor
{
  public wits0SampleRate: number;
  public wits0Direction: boolean;

  constructor(
    moduleId: string,
    dataSourceId: string,
    config: Partial<Wits0TransactionConfigDataModel>
  ) {
    super(moduleId, dataSourceId);

    const { subscription } = config;

    this.wits0SampleRate = subscription.sampleRate;
    this.wits0Direction = subscription.direction;
  }

  public static _initialize(
    moduleId: string,
    dataSourceId: string,
    sampleRate: number,
    direction: boolean
  ): Wits0SensorDataModel {
    return new this(moduleId, dataSourceId, {
      subscription: { sampleRate, direction } as IWits0Subscription,
    } as Wits0TransactionConfigDataModel);
  }
}
