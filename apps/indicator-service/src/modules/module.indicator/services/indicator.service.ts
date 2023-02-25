import { Injectable, Logger } from '@nestjs/common';
import { has, isEmpty } from 'lodash';
import { ErrorCodes } from '~iotcon-errors';
import { IndicatorDataModel, IndicatorModuleDataModel } from '~iotcon-models';
import { ForbiddenRpcError } from '../../../core/errors/rpc-errors';
import { IndicatorDataSourceService } from '../../module.integration/services/indicator-data-source.service';
import { ValidationService } from '../../module.validation/validation.service';
import { DUPLICATE_INDICATOR_NAME_MESSAGE } from '../constants/indicator.constants';
import { IndicatorRepository } from '../repository/indicator.repository';
import { IndicatorSettingsService } from './indicator-settings.service';

@Injectable()
export class IndicatorService {
  constructor(
    private readonly logger: Logger,
    private readonly validationService: ValidationService,
    private readonly indicatorRepository: IndicatorRepository,
    private readonly indicatorSettingsService: IndicatorSettingsService,
    private readonly indicatorDataSourceService: IndicatorDataSourceService,
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

    const dataSourceIds = this.extractDataSourceIds(sensor, publishers);

    const defaultSettings =
      this.indicatorSettingsService.retrieveDefaultSettings();

    const dataSources = await this.indicatorDataSourceService.getDataSources();
    const dataSource = await this.indicatorDataSourceService.getDataSourceById(
      '22',
    );
    console.log(dataSources);
  }

  private extractDataSourceIds(
    sensor: IndicatorModuleDataModel,
    publishers: IndicatorModuleDataModel[],
  ): string[] {
    const publishersDataSourceIds = publishers
      .map((publisher) => {
        if (has(publisher, 'dataSourceId')) {
          return publisher.dataSourceId;
        }
      })
      .filter(Boolean);

    const dataSourceIds = [...publishersDataSourceIds];

    if (sensor && !sensor.isPrimary && has(sensor, 'dataSourceId')) {
      dataSourceIds.push(sensor.dataSourceId);
    }

    return dataSourceIds;
  }
}
