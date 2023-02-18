import { Logger, Module } from '@nestjs/common';
import { RmqModule } from '../module.rmq/rmq.module';
import { TransactionService } from './services/transaction.service';

@Module({
  controllers: [],
  providers: [Logger, TransactionService],
  imports: [RmqModule],
  exports: [],
})
export class OrchestrationModule {}
