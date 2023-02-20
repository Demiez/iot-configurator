import { RmqExchangeTypesEnum } from '../../../enums';

export abstract class RmqModuleBaseModel {
  public exchangeName?: string = undefined;
  public exchangeType?: RmqExchangeTypesEnum = undefined;
  public exchangeDurable?: boolean = undefined;
  public routingKey?: string = undefined;
}
