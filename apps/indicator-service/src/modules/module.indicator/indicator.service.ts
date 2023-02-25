import { Injectable, Logger } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import { IndicatorDataModel } from '~iotcon-models';
import { ForbiddenRpcError } from '../../core/errors/rpc-errors';
import { ValidationService } from '../module.validation/validation.service';
import { DUPLICATE_INDICATOR_NAME_MESSAGE } from './constants/indicator.constants';
import { IndicatorRepository } from './repository/indicator.repository';

@Injectable()
export class IndicatorService {
  constructor(
    private readonly logger: Logger,
    private readonly validationService: ValidationService,
    private readonly indicatorRepository: IndicatorRepository,
  ) {}

  public async createIndicator(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    const errors =
      this.validationService.validateIndicatorModule(indicatorData);

    if (!isEmpty(errors)) {
      throw new ForbiddenRpcError(ErrorCodes.INVALID_INPUT_PARAMS, errors);
    }

    const { sensor, publishers, name, description, group, tags } =
      indicatorData;

    const doesIndicatorExistByName =
      await this.indicatorRepository.checkIfIndicatorExistsByName(name);

    if (doesIndicatorExistByName) {
      throw new ForbiddenRpcError(
        ErrorCodes.INVALID_INPUT_PARAMS_IS_DUPLICATE_VALUE,
        [DUPLICATE_INDICATOR_NAME_MESSAGE],
      );
    }
  }
}
