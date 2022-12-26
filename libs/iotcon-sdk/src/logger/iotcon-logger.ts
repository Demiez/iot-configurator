import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import { ILogger } from './interfaces/logger.interfaces';
import { join, resolve } from 'path';
import { SIMPLE_DATE_FORMAT } from '../constants/global.constants';
import dateformat from 'dateformat';
import { MetaContextEnum } from '../enums';
import { Inject, Service } from 'typedi';

@Injectable()
@Service()
export class IotconLogger implements ILogger, LoggerService {
  @Inject('context')
  private readonly context: MetaContextEnum;
  @Inject('contextPath')
  private readonly contextPath: string;
  private readonly date: string;
  private logger: Logger;

  constructor(context?: MetaContextEnum, contextPath?: string) {
    if (context) {
      this.context = context;
    }
    if (contextPath) {
      this.contextPath = contextPath || resolve(join(__dirname));
    }

    this.date = dateformat(new Date(), SIMPLE_DATE_FORMAT.toLowerCase());

    this.logger = createLogger({
      level: 'debug',
      defaultMeta: { service: this.context },
      format: format.combine(
        format.timestamp({ format: `${SIMPLE_DATE_FORMAT} HH:mm:ss` }),
        format.align(),
        format.errors({ stack: true }),
        format.printf((info) => {
          const log = `${info.level} [${this.context}]: ${[info.timestamp]}: ${
            info.message
          }`;

          return info.stack ? `${log}\n${info.stack}` : log;
        })
      ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize({
              all: true,
            })
          ),
        }),
      ],
    });

    if (this.contextPath) {
      this.logger.add(
        new transports.File({
          filename: join(contextPath, `/logs/${this.date}-log.log`),
        })
      );
    }
  }

  public info(
    infoMessage: string,
    data?: Record<string, unknown> | Record<string, unknown>[]
  ) {
    this.log(infoMessage, data);
  }

  public log(
    infoMessage: string,
    data?: Record<string, unknown> | Record<string, unknown>[]
  ): void {
    data
      ? this.logger.info(infoMessage + ': \n' + JSON.stringify(data, null, 4))
      : this.logger.info(infoMessage);
  }

  public error(
    errorMessage: string,
    data?: Error | Record<string, unknown> | Record<string, unknown>[]
  ): void {
    data
      ? this.logger.error(data)
      : this.logger.error(
          errorMessage + ': \n' + JSON.stringify(data, null, 4)
        );
  }

  public warn(warningMessage: string): void {
    this.logger.warn(warningMessage);
  }
}
