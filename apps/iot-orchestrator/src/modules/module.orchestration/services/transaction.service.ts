import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import {
  ITransaction,
  TransactionCompleteDataModel,
  TRANSACTIONS_EXCHANGE,
  TRANSACTIONS_RESULT_ROUTING_KEY,
} from '~iotcon-models';
import { RmqProvider } from '../../module.rmq/rmq.provider';
import { v4 } from 'uuid';

@Injectable()
export class TransactionService implements OnApplicationBootstrap {
  constructor(
    private readonly logger: Logger,
    private readonly rmqProvider: RmqProvider,
  ) {}

  public async onApplicationBootstrap(): Promise<void> {
    this.subscribeToTransactions();
  }

  private async processTransaction(transaction: ITransaction) {
    const { transactionId } = transaction;

    // TODO: module processing logic
    // TODO: log transaction

    this.publishTransactionCompleteMessage(transactionId, true);
  }

  private subscribeToTransactions(): void {
    this.rmqProvider.channel.consume(
      this.rmqProvider.transactionsQueue,
      async (msg) => {
        const transactionData: ITransaction = JSON.parse(
          msg.content.toString('utf-8'),
        );

        this.logger.log('Received transaction data', transactionData);

        this.rmqProvider.channel.ack(msg);

        await this.processTransaction({ transactionId: v4(), operations: [] });
      },
    );

    this.logger.log('Subscribed to transactions');
  }

  private publishTransactionCompleteMessage(
    transactionId: string,
    isComplete: boolean,
  ): void {
    const transactionCompleteData = new TransactionCompleteDataModel(
      transactionId,
      isComplete,
    );

    this.rmqProvider.channel.publish(
      TRANSACTIONS_EXCHANGE,
      TRANSACTIONS_RESULT_ROUTING_KEY,
      Buffer.from(JSON.stringify(transactionCompleteData)),
    );

    const result = isComplete ? 'complete' : 'not complete';

    this.logger.log(`Transaction ${transactionId} is ${result}`);
  }
}
