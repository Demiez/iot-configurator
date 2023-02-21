import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { join } from 'path';
import { DbProvider, IndicatorModule, RmqModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    RmqModule,
    IndicatorModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
