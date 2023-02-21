import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import { IndicatorDataModel } from '~iotcon-models';
import { ForbiddenRpcError } from '../../core/errors/rpc-errors';
import { ValidationService } from '../module.validation/validation.service';

@Injectable()
export class IndicatorService {
  constructor(
    private readonly logger: Logger,
    private readonly validationService: ValidationService,
  ) {}

  public async createIndicator(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    const errors =
      this.validationService.validateIndicatorModule(indicatorData);

    if (!isEmpty(errors)) {
      throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, errors);
    }
  }
}
