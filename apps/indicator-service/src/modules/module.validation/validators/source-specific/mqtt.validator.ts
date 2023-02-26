import { BaseValidator } from '../abstract/base.validator';
import { MQTT_REQUIRED_FIELDS_LIST } from '../../constants';
import { IMqttSettings, IndicatorModuleDataModel } from '~iotcon-models';
import { FieldIsBadModel } from '~iotcon-errors';

export class MqttValidator extends BaseValidator {
  public static validateMqttFields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
    isExternal?: boolean,
  ): void {
    this.validateFieldsExistence(
      indicatorModule,
      MQTT_REQUIRED_FIELDS_LIST,
      errors,
    );

    if (isExternal) {
      this.validateExternalVariableName(
        (indicatorModule as IndicatorModuleDataModel).variableName,
        errors,
      );
    }
  }

  public static validateMqttSettings(
    mqttSettings: IMqttSettings,
    errors: FieldIsBadModel[],
  ): void {
    this.validateMqttTopic(mqttSettings.mqttTopic, errors);
  }

  private static validateMqttTopic(
    mqttTopic: string,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateStringField(mqttTopic, 'mqttTopic');

    if (error) {
      errors.push(error);
    }
  }
}
