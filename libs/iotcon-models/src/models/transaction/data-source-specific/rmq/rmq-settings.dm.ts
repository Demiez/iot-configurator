import { v4 } from 'uuid';
import { RmqExchangeTypesEnum } from '../../../../enums';
import { IRmqExchangeDetails, IRmqSettings } from '../../../../interfaces';
import { Identifier } from '../../../core';
import { RmqConfigSettingsDataModel } from './rmq-config-settings.dm';

export class RmqSettingsDataModel extends Identifier implements IRmqSettings {
  public _id?: string;

  public exchangeName: string;
  public exchangeType: RmqExchangeTypesEnum;
  public exchangeDurable: boolean;

  constructor(rmqSettings: RmqConfigSettingsDataModel, id?: string) {
    super();
    this.exchangeName = rmqSettings.exchangeName;
    this.exchangeType = rmqSettings.exchangeType;
    this.exchangeDurable = rmqSettings.exchangeDurable;

    if (id) {
      this._id = id;
    }
  }

  public static _initialize(
    exchangeName: string,
    exchangeType: RmqExchangeTypesEnum,
    exchangeDurable: boolean,
    omitIdInit?: boolean
  ): RmqSettingsDataModel {
    return new this(
      {
        exchangeName,
        exchangeType,
        exchangeDurable,
      } as RmqConfigSettingsDataModel,
      omitIdInit ? undefined : v4()
    );
  }

  public static _initializeFromGlobalData(
    rmqExchangeDetails: IRmqExchangeDetails
  ): RmqSettingsDataModel {
    const { name, type, durable } = rmqExchangeDetails;

    return new this({
      exchangeName: name,
      exchangeType: type,
      exchangeDurable: durable,
    } as RmqConfigSettingsDataModel);
  }
}
