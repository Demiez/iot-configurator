import { BaseStatus } from '../../enums/core';

export class StandardResponseViewModel<T> {
  public result: T;
  public message: string;
  public status: BaseStatus | number;

  constructor(result?: T, message?: string, status?: BaseStatus | number) {
    this.result = result;
    this.message = message;
    this.status = status;
  }
}
