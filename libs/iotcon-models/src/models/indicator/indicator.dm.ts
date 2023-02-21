import { keys, pick } from 'lodash';
import { IIndicator } from '../../interfaces';
import { IndicatorBaseModel } from './abstract/indicator.bm';
import { IndicatorModuleDataModel } from './indicator-module.dm';

export class IndicatorDataModel extends IndicatorBaseModel {
  sensor: IndicatorModuleDataModel;
  publishers: IndicatorModuleDataModel[];

  constructor(indicatorData: IIndicator) {
    super();
    const pickedData = pick(indicatorData, keys(indicatorData));

    Object.assign(this, pickedData);
  }
}
