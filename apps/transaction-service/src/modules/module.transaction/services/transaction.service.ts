import { Injectable, Logger } from '@nestjs/common';
import { IndicatorDataModel } from '~iotcon-models';

@Injectable()
export class TransactionService {
  constructor(private readonly logger: Logger) {}

  public async createTransaction(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    console.log(indicatorData);
  }
}
