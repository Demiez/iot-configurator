import { IWits0Subscription, IWits0Variable } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';

export class Wits0SubscriptionDataModel implements IWits0Subscription {
  public sampleRate: number;
  public direction: boolean;
  public variables: IWits0Variable[];

  constructor(
    indicatorModule: IndicatorModuleDataModel,
    variables: IWits0Variable[]
  ) {
    this.sampleRate = indicatorModule.wits0SampleRate;
    this.direction = indicatorModule.wits0Direction;
    this.variables = variables;
  }
}
