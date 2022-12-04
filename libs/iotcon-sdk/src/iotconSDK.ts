import { log } from './utils/logger';

/**
 * The entry point class for the IotCon SDK.
 * This class contains required functionality
 */
export class IotConSdk {
  public utils: {
    log: (data: string) => void;
  };

  constructor() {
    this.utils = { log };
  }
}
