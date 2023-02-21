import { Injectable, Logger } from '@nestjs/common';
import { IndicatorDataModel } from '~iotcon-models';

@Injectable()
export class IndicatorService {
  constructor(private readonly logger: Logger) {}

  public async createIndicator(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    console.log(indicatorData);
  }
}
