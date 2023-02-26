import { BaseValidator } from '../abstract/base.validator';
import { BaseValidationMessagesEnum } from '../../enums/base-validation-messages.enum';
import {
  EndiansEnum,
  IndicatorModuleDataModel,
  IVariableModbusData,
  RegisterTypesEnum,
  TypeValuesEnum,
} from '~iotcon-models';
import { FieldIsBadModel } from '~iotcon-errors';
import {
  MODBUS_ENDIAN_VALUE_MESSAGE,
  MODBUS_REGISTER_TYPE_VALUE_MESSAGE,
  MODBUS_REQUIRED_FIELDS_LIST,
  MODBUS_TYPE_VALUE_VALUE_MESSAGE,
} from '../../constants';

export class ModbusValidator extends BaseValidator {
  public static validateModbusFields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
    isSensor?: boolean,
    disableModbusDataValidation?: boolean,
  ): void {
    const { modbusSampleRate, modbusReadBlocksData, modbusData } =
      indicatorModule;

    if (isSensor) {
      this.validateModbusSampleRate(modbusSampleRate, errors);
      this.validateModbusReadBlocksData(modbusReadBlocksData, errors);
    }

    if (!disableModbusDataValidation) {
      this.validateFieldsExistence(
        indicatorModule,
        MODBUS_REQUIRED_FIELDS_LIST,
        errors,
      );

      this.validateModbusData(modbusData, errors);
    }
  }

  public static validateModbusData(
    modbusData: IVariableModbusData,
    errors: FieldIsBadModel[],
  ): void {
    if (!modbusData) {
      errors.push(
        new FieldIsBadModel(
          'modbusData',
          BaseValidationMessagesEnum.PROVIDE_VALUE_MESSAGE,
        ),
      );

      return;
    }

    const { registerType, typeValue, endian, startAddress } = modbusData;

    if (!Object.values(RegisterTypesEnum).includes(registerType)) {
      errors.push(
        new FieldIsBadModel('registerType', MODBUS_REGISTER_TYPE_VALUE_MESSAGE),
      );
    }

    if (!Object.values(TypeValuesEnum).includes(typeValue)) {
      errors.push(
        new FieldIsBadModel('typeValue', MODBUS_TYPE_VALUE_VALUE_MESSAGE),
      );
    }

    if (!Object.values(EndiansEnum).includes(endian)) {
      errors.push(new FieldIsBadModel('endian', MODBUS_ENDIAN_VALUE_MESSAGE));
    }

    const startAddressError = this.validateNumberField(
      startAddress,
      'startAddress',
      true,
    );

    if (startAddressError) {
      errors.push(startAddressError);
    }
  }

  private static validateModbusSampleRate(
    modbusSampleRate: number,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateNumberField(
      modbusSampleRate,
      'modbusSampleRate',
      true,
    );

    if (error) {
      errors.push(error);
    }
  }

  private static validateModbusReadBlocksData(
    modbusReadBlocksData: boolean,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateBooleanField(
      modbusReadBlocksData,
      'modbusReadBlocksData',
    );

    if (error) {
      errors.push(error);
    }
  }
}
