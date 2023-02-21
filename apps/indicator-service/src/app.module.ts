import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { join } from 'path';
import {
  DbProvider,
  IndicatorModule,
  RmqModule,
  ValidationModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    RmqModule,
    IndicatorModule,
    ValidationModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
