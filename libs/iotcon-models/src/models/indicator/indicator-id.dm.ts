import { IIndicatorId } from '../../interfaces';

export class IndicatorIdDataModel implements IIndicatorId {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}
