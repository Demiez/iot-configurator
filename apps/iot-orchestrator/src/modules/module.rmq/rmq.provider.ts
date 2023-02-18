import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import amqp from 'amqplib';
import { Connection, Channel } from 'amqplib';
import process from 'process';
import {
  RmqExchangeTypesEnum,
  TRANSACTIONS_EXCHANGE,
  TRANSACTIONS_QUEUE,
  TRANSACTIONS_RESULT_QUEUE,
  TRANSACTIONS_RESULT_ROUTING_KEY,
  TRANSACTIONS_ROUTING_KEY,
} from '~iotcon-models';

@Injectable()
export class RmqProvider implements OnModuleInit {
  public channel: Channel;
  public transactionsQueue: string;
  public transactionsResultQueue: string;

  private connection: Connection;

  constructor(private readonly logger: Logger) {}

  public async onModuleInit(): Promise<void> {
    await this._initializeConnection();
    await this._createChannel();
    await this._bindQueues();
  }

  private async _initializeConnection(): Promise<void> {
    this.connection = await amqp.connect(process.env.RMQ_URL);
    this.logger.log('RMQ is connected');
  }

  private async _createChannel() {
    this.channel = await this.connection.createChannel();
    this.logger.log('RMQ channel created');
  }

  private async _bindQueues() {
    await this.channel.assertExchange(
      TRANSACTIONS_EXCHANGE,
      RmqExchangeTypesEnum.DIRECT,
      {
        durable: false,
      },
    );

    const [assertedTransactionsQueue, assertedTransactionsResultQueue] =
      await Promise.all([
        this.channel.assertQueue(TRANSACTIONS_QUEUE),
        this.channel.assertQueue(TRANSACTIONS_RESULT_QUEUE),
      ]);

    this.transactionsQueue = assertedTransactionsQueue.queue;
    this.transactionsResultQueue = assertedTransactionsResultQueue.queue;

    await Promise.all([
      this.channel.bindQueue(
        this.transactionsQueue,
        TRANSACTIONS_EXCHANGE,
        TRANSACTIONS_ROUTING_KEY,
      ),
      this.channel.bindQueue(
        this.transactionsResultQueue,
        TRANSACTIONS_EXCHANGE,
        TRANSACTIONS_RESULT_ROUTING_KEY,
      ),
    ]);

    this.logger.log(
      `Bound queues: ${this.transactionsQueue}, ${this.transactionsResultQueue}`,
    );
  }
}
