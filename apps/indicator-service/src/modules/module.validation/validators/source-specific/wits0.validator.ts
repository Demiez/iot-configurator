import { FieldIsBadModel } from '~iotcon-errors';
import { IndicatorModuleDataModel } from '~iotcon-models';
import { BaseValidator } from '../abstract/base.validator';

export class Wits0Validator extends BaseValidator {
  public static validateWits0Fields(
    indicatorModule: IndicatorModuleDataModel,
    errors: FieldIsBadModel[],
  ): void {
    const { wits0SampleRate, wits0Direction } = indicatorModule;

    this.validateWits0SampleRate(wits0SampleRate, errors);
    this.validateWits0Direction(wits0Direction, errors);
  }

  private static validateWits0SampleRate(
    wits0SampleRate: number,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateNumberField(
      wits0SampleRate,
      'wits0SampleRate',
      true,
    );

    if (error) {
      errors.push(error);
    }
  }

  private static validateWits0Direction(
    wits0Direction: boolean,
    errors: FieldIsBadModel[],
  ) {
    const error = this.validateBooleanField(wits0Direction, 'wits0Direction');

    if (error) {
      errors.push(error);
    }
  }
}
