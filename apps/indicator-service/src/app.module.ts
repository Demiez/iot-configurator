import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { join } from 'path';
import {
  DbProvider,
  IndicatorModule,
  IntegrationModule,
  RmqModule,
  ValidationModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    DbProvider._initialize(),
    RmqModule,
    IndicatorModule,
    ValidationModule,
    IntegrationModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
