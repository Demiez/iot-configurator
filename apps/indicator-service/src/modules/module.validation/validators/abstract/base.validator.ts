import { isBoolean, isInteger, isNil, isNumber, isString } from 'lodash';
import { validate as validateUuid } from 'uuid';
import { FieldIsBadModel } from '~iotcon-errors';
import { IBaseVariable, UocsEnum, UomsEnum } from '~iotcon-models';
import {
  INDICATOR_MODULE_VARIABLE_NAME_MESSAGE,
  VARIABLE_ID_VALUE_MESSAGE,
  VARIABLE_INDICATOR_KEY_MESSAGE,
  VARIABLE_NAME_MESSAGE,
  VARIABLE_UOC_MESSAGE,
  VARIABLE_UOC_VALUE_MESSAGE,
  VARIABLE_UOM_MESSAGE,
  VARIABLE_UOM_VALUE_MESSAGE,
} from '../../constants';
import { BaseValidationMessagesEnum } from '../../enums/base-validation-messages.enum';

export abstract class BaseValidator {
  protected static errors: FieldIsBadModel[];

  protected static validateStringField(
    value: string,
    fieldName: string,
    customProvideValueMessage?: string,
  ): FieldIsBadModel {
    if (!value) {
      return new FieldIsBadModel(
        fieldName,
        customProvideValueMessage
          ? customProvideValueMessage
          : BaseValidationMessagesEnum.PROVIDE_VALUE_MESSAGE,
      );
    }

    if (!isString(value)) {
      return new FieldIsBadModel(
        fieldName,
        BaseValidationMessagesEnum.MUST_BE_STRING,
      );
    }
  }

  protected static validateNumberField(
    value: number,
    fieldName: string,
    isIntegerValue?: boolean,
    customProvideValueMessage?: string,
  ): FieldIsBadModel {
    if (isNil(value)) {
      return new FieldIsBadModel(
        fieldName,
        customProvideValueMessage
          ? customProvideValueMessage
          : BaseValidationMessagesEnum.PROVIDE_VALUE_MESSAGE,
      );
    }

    if (!isNumber(value)) {
      return new FieldIsBadModel(
        fieldName,
        BaseValidationMessagesEnum.MUST_BE_NUMBER,
      );
    }

    if (isIntegerValue && !isInteger(value)) {
      return new FieldIsBadModel(
        fieldName,
        BaseValidationMessagesEnum.MUST_BE_INTEGER,
      );
    }
  }

  protected static validateBooleanField(
    value: boolean,
    fieldName: string,
  ): FieldIsBadModel {
    if (isNil(value)) {
      return new FieldIsBadModel(
        fieldName,
        BaseValidationMessagesEnum.PROVIDE_VALUE_MESSAGE,
      );
    }

    if (!isBoolean(value)) {
      return new FieldIsBadModel(
        fieldName,
        BaseValidationMessagesEnum.MUST_BE_BOOLEAN,
      );
    }
  }

  protected static validateUuidString(uuid: string): boolean {
    return validateUuid(uuid);
  }

  protected static validateVariableFields(
    variable: IBaseVariable,
    errors: FieldIsBadModel[],
    isBatchVariable?: boolean,
    isModbusVariable?: boolean,
    isWits0Variable?: boolean,
  ): void {
    const { variableName, uom, uoc, indicatorKey, variableId } = variable;

    if (!isModbusVariable && !isWits0Variable) {
      this.validateVariableName(variableName, errors);
    }

    if (isWits0Variable) {
      this.validateVariableId(variableId, errors);
    }

    this.validateUom(uom, errors);
    this.validateUoc(uoc, errors);

    if (isBatchVariable) {
      this.validateIndicatorKey(indicatorKey, errors);
    }
  }

  public static validateExternalVariableName(
    variableName: string,
    errors: FieldIsBadModel[],
  ): void {
    if (!this.validateUuidString(variableName)) {
      errors.push(
        new FieldIsBadModel(
          'variableName',
          INDICATOR_MODULE_VARIABLE_NAME_MESSAGE,
        ),
      );
    }
  }

  private static validateIndicatorKey(
    indicatorKey: string,
    errors: FieldIsBadModel[],
  ): void {
    const error = this.validateStringField(indicatorKey, 'indicatorKey');

    if (error) {
      errors.push(error);
      return;
    }

    if (!this.validateUuidString(indicatorKey)) {
      errors.push(
        new FieldIsBadModel('indicatorKey', VARIABLE_INDICATOR_KEY_MESSAGE),
      );
    }
  }

  private static validateVariableName(
    variableName: string,
    errors: FieldIsBadModel[],
  ): void {
    const error = this.validateStringField(
      variableName,
      'variableName',
      VARIABLE_NAME_MESSAGE,
    );

    if (error) {
      errors.push(error);
      return;
    }
  }

  private static validateUom(uom: string, errors: FieldIsBadModel[]): void {
    const error = this.validateStringField(uom, 'uom', VARIABLE_UOM_MESSAGE);

    if (error) {
      errors.push(error);
      return;
    }

    if (!Object.keys(UomsEnum).includes(uom)) {
      errors.push(new FieldIsBadModel('uom', VARIABLE_UOM_VALUE_MESSAGE));
    }
  }

  private static validateUoc(uoc: string, errors: FieldIsBadModel[]): void {
    const error = this.validateStringField(uoc, 'uoc', VARIABLE_UOC_MESSAGE);

    if (error) {
      errors.push(error);
      return;
    }

    if (!Object.keys(UocsEnum).includes(uoc)) {
      errors.push(new FieldIsBadModel('uoc', VARIABLE_UOC_VALUE_MESSAGE));
    }
  }

  private static validateVariableId(
    variableId: string,
    errors: FieldIsBadModel[],
  ): void {
    const error = this.validateStringField(variableId, 'variableId');

    if (error) {
      errors.push(error);
      return;
    }

    const wits0StringValues = variableId.split(';');
    const variableIdValidationError = new FieldIsBadModel(
      'variableId',
      VARIABLE_ID_VALUE_MESSAGE,
    );

    if (wits0StringValues.length !== 2) {
      this.errors.push(variableIdValidationError);
      return;
    }

    let variableIdValidationErrorNumber = 0;
    const recordData = wits0StringValues[0].split('=');
    const itemData = wits0StringValues[1].split('=');

    if (recordData[0] !== 'record' || itemData[0] !== 'item') {
      variableIdValidationErrorNumber++;
    }

    const recordValueError = this.validateNumberField(
      Number(recordData[1]),
      'record',
      true,
    );

    const itemValueError = this.validateNumberField(
      Number(itemData[1]),
      'item',
      true,
    );

    if (recordValueError || itemValueError) {
      variableIdValidationErrorNumber++;
    }

    if (variableIdValidationErrorNumber > 0) {
      errors.push(variableIdValidationError);
    }
  }
}
