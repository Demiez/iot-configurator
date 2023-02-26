import { BaseValidator } from '../abstract/base.validator';
import { INSITE_REQUIRED_FIELDS_LIST } from '../../constants';
import { IndicatorModuleDataModel } from '~iotcon-models';
import { FieldIsBadModel } from '~iotcon-errors';

export class InsiteValidator extends BaseValidator {
  public static validateInsiteFields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
  ): void {
    this.validateFieldsExistence(
      indicatorModule,
      INSITE_REQUIRED_FIELDS_LIST,
      errors,
    );
  }
}
