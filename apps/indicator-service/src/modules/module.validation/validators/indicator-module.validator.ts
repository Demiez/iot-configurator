import { isArray, isEmpty, isNil } from 'lodash';
import { utils } from '~iotcon-sdk';
import { BaseValidator } from './abstract/base.validator';
import {
  DataSourceTypesEnum,
  IBaseVariable,
  IndicatorDataModel,
  IndicatorModuleDataModel,
} from '~iotcon-models';
import {
  DATA_SOURCE_ID_FOR_IS_PRIMARY_MESSAGE,
  DATA_SOURCE_TYPE_FOR_IS_PRIMARY_MESSAGE,
  DATA_SOURCE_TYPE_VALUE_MESSAGE,
  DATA_SOURCE_UUID_MESSAGE,
  MODULE_ID_UUID_MESSAGE,
  TAGS_ARRAY_UNIQUE_VALUE_MESSAGE,
  TAGS_ARRAY_VALUE_MESSAGE,
  TAGS_IS_ARRAY_MESSAGE,
} from '../constants';
import { FieldIsBadModel } from '~iotcon-errors';

export class IndicatorModuleValidator extends BaseValidator {
  public static validate(
    indicatorDataModel: IndicatorDataModel,
  ): FieldIsBadModel[] {
    this.errors = [];

    const { sensor, publishers } = indicatorDataModel;

    this.validateBaseFields(indicatorDataModel);
    this.validateModule(sensor);

    if (!isEmpty(publishers)) {
      publishers.forEach((publisher) => this.validateModule(publisher));
    }

    return this.errors;
  }

  private static validateBaseFields(indicatorDataModel: IndicatorDataModel) {
    const { name, id, description, group, tags } = indicatorDataModel;

    this.validateBaseField(name, utils.convertVariableToString({ name }));

    if (!isNil(id)) {
      this.validateBaseField(id, utils.convertVariableToString({ id }));
    }

    if (!isNil(description)) {
      this.validateBaseField(
        description,
        utils.convertVariableToString({ description }),
      );
    }

    if (!isNil(group)) {
      this.validateBaseField(group, utils.convertVariableToString({ group }));
    }

    if (!isNil(tags)) {
      this.validateTags(tags, utils.convertVariableToString({ tags }));
    }
  }

  private static validateModule(
    module: IndicatorModuleDataModel,
    isReplace?: boolean,
    isOutgoingUnpublishedSignal?: boolean,
  ) {
    const {
      id,
      dataSourceId,
      variableName,
      uom,
      uoc,
      isPrimary,
      dataSourceType,
      modbusData,
      variableId,
    } = module;

    if (isReplace && !isOutgoingUnpublishedSignal) {
      this.validateId(id, utils.convertVariableToString({ id }));
    }

    if (!isPrimary) {
      this.validateDatasourceId(
        dataSourceId,
        utils.convertVariableToString({ dataSourceId }),
      );
    }

    if (isPrimary && dataSourceId) {
      this.errors.push(
        new FieldIsBadModel(
          'dataSourceId',
          DATA_SOURCE_ID_FOR_IS_PRIMARY_MESSAGE,
        ),
      );
    } else {
      this.validatePrimaryConfigFields(isPrimary, dataSourceType);
    }

    this.validateVariableFields(
      {
        variableName,
        variableId,
        uom,
        uoc,
      } as IBaseVariable,
      this.errors,
      false,
      !!modbusData,
      !!variableId,
    );
  }

  private static validateBaseField(
    fieldValue: string,
    fieldName: string,
    customMessage?: string,
  ) {
    const error = this.validateStringField(
      fieldValue,
      fieldName,
      customMessage,
    );

    if (error) {
      this.errors.push(error);
    }
  }

  private static validateId(id: string, fieldName: string) {
    const error = this.validateStringField(id, fieldName);

    if (error) {
      this.errors.push(error);
    }

    if (!this.validateUuidString(id)) {
      this.errors.push(new FieldIsBadModel(fieldName, MODULE_ID_UUID_MESSAGE));
    }
  }

  private static validateDatasourceId(dataSourceId: string, fieldName: string) {
    const error = this.validateStringField(dataSourceId, fieldName);

    if (error) {
      this.errors.push(error);
    }

    if (!this.validateUuidString(dataSourceId)) {
      this.errors.push(
        new FieldIsBadModel(fieldName, DATA_SOURCE_UUID_MESSAGE),
      );
    }
  }

  private static validatePrimaryConfigFields(
    isPrimary: boolean,
    dataSourceType: DataSourceTypesEnum,
  ) {
    if (isPrimary === false || isNil(isPrimary)) {
      return;
    }

    if (!dataSourceType) {
      this.errors.push(
        new FieldIsBadModel(
          'dataSourceType',
          DATA_SOURCE_TYPE_FOR_IS_PRIMARY_MESSAGE,
        ),
      );
    }

    this.validateIsPrimaryField(
      isPrimary,
      utils.convertVariableToString({ isPrimary }),
    );

    this.validateDataSourceTypeField(
      dataSourceType,
      utils.convertVariableToString({ dataSourceType }),
    );
  }

  private static validateIsPrimaryField(
    fieldValue: boolean,
    fieldName: string,
  ) {
    const error = this.validateBooleanField(fieldValue, fieldName);

    if (error) {
      this.errors.push(error);
    }
  }

  private static validateDataSourceTypeField(
    fieldValue: DataSourceTypesEnum,
    fieldName: string,
  ) {
    const error = this.validateStringField(fieldValue, fieldName);

    if (error) {
      return this.errors.push(error);
    }

    if (!Object.values(DataSourceTypesEnum).includes(fieldValue)) {
      this.errors.push(
        new FieldIsBadModel(fieldName, DATA_SOURCE_TYPE_VALUE_MESSAGE),
      );
    }
  }

  private static validateTags(tags: string[], fieldName: string) {
    if (!isArray(tags)) {
      return this.errors.push(
        new FieldIsBadModel(fieldName, TAGS_IS_ARRAY_MESSAGE),
      );
    }

    const isStringOnly = tags.every((tag) => typeof tag === 'string');

    if (!isStringOnly) {
      return this.errors.push(
        new FieldIsBadModel(fieldName, TAGS_ARRAY_VALUE_MESSAGE),
      );
    }

    if (tags.length !== Array.from(new Set(tags)).length) {
      return this.errors.push(
        new FieldIsBadModel(fieldName, TAGS_ARRAY_UNIQUE_VALUE_MESSAGE),
      );
    }
  }
}
