import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'process';
import { join } from 'path';
import {
  DbProvider,
  OrchestrationModule,
  RmqModule,
  SchemaTemplateModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '../../.env'),
    }),
    DbProvider._initialize(),
    SchemaTemplateModule,
    RmqModule,
    OrchestrationModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
