import { Injectable } from '@nestjs/common';
import { FieldIsBadModel } from '~iotcon-errors';
import { IndicatorDataModel } from '~iotcon-models';
import { IndicatorModuleValidator } from './validators';

@Injectable()
export class ValidationService {
  public validateIndicatorModule(
    indicatorData: IndicatorDataModel,
  ): FieldIsBadModel[] {
    return IndicatorModuleValidator.validate(indicatorData);
  }
}
