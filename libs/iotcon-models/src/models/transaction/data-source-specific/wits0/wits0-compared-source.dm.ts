import { IPublisher, ISensor } from '../../../../interfaces';
import { IndicatorModuleDataModel } from '../../../indicator';

export class Wits0ComparedSourceDataModel {
  public sampleRate: number;
  public direction: boolean;

  constructor(
    indicatorModule: IndicatorModuleDataModel | ISensor | IPublisher
  ) {
    this.sampleRate = indicatorModule.wits0SampleRate;
    this.direction = indicatorModule.wits0Direction;
  }
}
