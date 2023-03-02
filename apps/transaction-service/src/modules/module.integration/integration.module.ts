import { Logger, Module } from '@nestjs/common';
import { TransactionIotOrchestratorService } from './services/transaction-iot-orchestrator.service';

@Module({
  controllers: [],
  providers: [Logger, TransactionIotOrchestratorService],
  imports: [],
  exports: [TransactionIotOrchestratorService],
})
export class IntegrationModule {}
