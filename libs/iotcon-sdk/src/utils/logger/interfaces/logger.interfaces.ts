import { LogMessageType } from '../types/log-message.types';

export interface ILogger {
  /**
   * Logs message data with INFO level.
   * Generic level logging, recommended for standard use
   * @param message
   */
  info(message: LogMessageType): void;

  /**
   * Logs message data with WARN level.
   * @param message
   */
  warn(message: LogMessageType): void;

  /**
   * Log message with ERROR level.
   * Used to log errors
   * @param message
   * @param [data] - Error data to print
   */
  error(
    message: LogMessageType,
    data?: Error | Record<string, unknown> | Record<string, unknown>[]
  ): void;
}
