import { ITransactionComplete } from '../../interfaces';

export class TransactionCompleteDataModel implements ITransactionComplete {
  public transactionId: string;
  public isComplete: boolean;

  constructor(transactionId: string, isComplete: boolean) {
    this.transactionId = transactionId;
    this.isComplete = isComplete;
  }
}
