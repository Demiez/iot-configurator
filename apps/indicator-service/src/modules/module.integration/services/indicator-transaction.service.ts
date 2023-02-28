import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { IndicatorDataModel } from '~iotcon-models';
import { Empty, RpcServicesEnum } from '~iotcon-proto';
import { handleRpcError } from '../../../core/errors/rpc-errors';
import { transactionGrpcOptions } from '../grpc-options';

interface ITransactionGrpcService {
  createTransaction(request: IndicatorDataModel): Observable<Empty>;
}

@Injectable()
export class IndicatorTransactionService implements OnModuleInit {
  @Client(transactionGrpcOptions) private readonly client: ClientGrpc;
  private transactionClient: ITransactionGrpcService;

  constructor(private readonly logger: Logger) {}

  public onModuleInit(): void {
    this.transactionClient = this.client.getService<ITransactionGrpcService>(
      RpcServicesEnum.TRANSACTION_SERVICE,
    );
  }

  public async createTransaction(
    indicatorData: IndicatorDataModel,
  ): Promise<void> {
    try {
      const result$ = this.transactionClient.createTransaction(indicatorData);

      await lastValueFrom(result$);
    } catch (error) {
      handleRpcError(error);
    }
  }
}
