import { FieldIsBadModel } from '~iotcon-errors';
import {
  IDefaultRmqSettings,
  IndicatorModuleDataModel,
  IRmqSettings,
  RmqExchangeTypesEnum,
} from '~iotcon-models';
import {
  RMQ_ECHANGE_TYPE_VALUE_MESSAGE,
  RMQ_REQUIRED_FIELDS_LIST,
} from '../../constants';
import { BaseValidator } from '../abstract/base.validator';

export class RmqValidator extends BaseValidator {
  public static validateRmqFields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
    isExternal?: boolean,
  ): void {
    this.validateFieldsExistence(
      indicatorModule,
      RMQ_REQUIRED_FIELDS_LIST,
      errors,
    );

    const { exchangeName, exchangeType, exchangeDurable, routingKey } =
      indicatorModule;

    this.validateExchangeName(exchangeName, errors);
    this.validateExchangeType(exchangeType, errors);
    this.validateExchangeDurable(exchangeDurable, errors);
    this.validateRoutingKey(routingKey, errors);

    if (isExternal) {
      this.validateExternalVariableName(
        (indicatorModule as IndicatorModuleDataModel).variableName,
        errors,
      );
    }
  }

  public static validateRmqSettings(
    rmqConnectionData: IDefaultRmqSettings,
    errors: FieldIsBadModel[],
  ): void {
    const { exchangeName, exchangeType, exchangeDurable, routingKey } =
      rmqConnectionData;

    this.validateExchangeName(exchangeName, errors);
    this.validateExchangeType(exchangeType, errors);
    this.validateExchangeDurable(exchangeDurable, errors);
    this.validateRoutingKey(routingKey, errors);
  }

  public static validateRmqSettingsData(
    rmqSettingsData: IRmqSettings,
    errors: FieldIsBadModel[],
  ): void {
    const { exchangeName, exchangeType, exchangeDurable } = rmqSettingsData;

    this.validateExchangeName(exchangeName, errors);
    this.validateExchangeType(exchangeType, errors);
    this.validateExchangeDurable(exchangeDurable, errors);
  }

  private static validateExchangeName(
    exchangeName: string,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateStringField(exchangeName, 'exchangeName');

    if (error) {
      errors.push(error);
    }
  }

  private static validateExchangeType(
    exchangeType: RmqExchangeTypesEnum,
    errors: FieldIsBadModel[],
  ) {
    if (!Object.values(RmqExchangeTypesEnum).includes(exchangeType)) {
      errors.push(
        new FieldIsBadModel('exchangeType', RMQ_ECHANGE_TYPE_VALUE_MESSAGE),
      );
    }
  }

  private static validateExchangeDurable(
    exchangeDurable: boolean,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateBooleanField(exchangeDurable, 'exchangeDurable');

    if (error) {
      errors.push(error);
    }
  }

  private static validateRoutingKey(
    routingKey: string,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateStringField(routingKey, 'routingKey');

    if (error) {
      errors.push(error);
    }
  }
}
