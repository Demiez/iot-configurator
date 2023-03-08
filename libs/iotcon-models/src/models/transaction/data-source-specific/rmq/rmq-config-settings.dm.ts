import { RmqExchangeTypesEnum } from '../../../../enums';
import { IndicatorModuleDataModel } from '../../../indicator';

export class RmqConfigSettingsDataModel {
  public exchangeName: string;
  public exchangeType: RmqExchangeTypesEnum;
  public exchangeDurable: boolean;

  constructor(indicatorModule: IndicatorModuleDataModel) {
    const { exchangeName, exchangeType, exchangeDurable } = indicatorModule;

    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.exchangeDurable = exchangeDurable;
  }

  public static _initialize(
    exchangeName: string,
    exchangeType: RmqExchangeTypesEnum,
    exchangeDurable: boolean
  ): RmqConfigSettingsDataModel {
    return new this({
      exchangeName,
      exchangeType,
      exchangeDurable,
    } as IndicatorModuleDataModel);
  }
}
