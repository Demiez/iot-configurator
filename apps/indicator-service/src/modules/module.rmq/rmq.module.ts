import { Logger, Module } from '@nestjs/common';
import { RmqProvider } from './rmq.provider';

@Module({
  controllers: [],
  providers: [Logger, RmqProvider],
  imports: [],
  exports: [RmqProvider],
})
export class RmqModule {}
