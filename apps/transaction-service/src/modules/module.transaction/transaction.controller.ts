import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IIndicator, IndicatorDataModel } from '~iotcon-models';
import { RpcServicesEnum, Empty, TransactionRpcNamesEnum } from '~iotcon-proto';
import { TransactionService } from './services/transaction.service';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @GrpcMethod(
    RpcServicesEnum.TRANSACTION_SERVICE,
    TransactionRpcNamesEnum.CREATE_TRANSACTION,
  )
  public async createTransaction(
    request: IIndicator,
    _metadata: Metadata,
    _call: ServerUnaryCall<IIndicator, Empty>,
  ): Promise<void> {
    const indicatorData = new IndicatorDataModel(request);

    await this.transactionService.createTransaction(indicatorData);
  }
}
