import { DynamicModule, Injectable } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import process from 'process';

@Injectable()
export class DbProvider extends MongooseModule {
  public static _initialize(): DynamicModule {
    const { MONGO_URL, MONGO_USER, MONGO_PASSWORD } = process.env;

    const options: MongooseModuleOptions = {
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
      dbName: 'transaction-data',
    };

    return this.forRoot(MONGO_URL, options);
  }
}
