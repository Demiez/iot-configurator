import { FieldIsBadModel } from '~iotcon-errors';
import {
  IndicatorModuleDataModel,
  SubscriptionModesEnum,
} from '~iotcon-models';
import { OPCUA_DATA_SOURCE_VALUE_MESSAGE } from '../../constants';
import { BaseValidator } from '../abstract/base.validator';

export class OpcuaValidator extends BaseValidator {
  public static validateOpcuaFields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
  ): void {
    const { subscriptionMode } = indicatorModule;

    if (subscriptionMode) {
      this.validateSubscriptionMode(subscriptionMode, errors);
    }
  }

  private static validateSubscriptionMode(
    subscriptionMode: SubscriptionModesEnum,
    errors: FieldIsBadModel[],
  ) {
    if (!Object.values(SubscriptionModesEnum).includes(subscriptionMode)) {
      errors.push(
        new FieldIsBadModel(
          'subscriptionMode',
          OPCUA_DATA_SOURCE_VALUE_MESSAGE,
        ),
      );
    }
  }
}
