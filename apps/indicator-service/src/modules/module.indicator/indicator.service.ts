import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class IndicatorService implements OnApplicationBootstrap {
  constructor(private readonly logger: Logger) {}

  onApplicationBootstrap(): void {
    throw new Error('Method not implemented.');
  }
}
