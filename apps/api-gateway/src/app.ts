import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import router from './core/router';
import process from 'process';
import { join, resolve } from 'path';
import errorHandlingMiddleware from './core/middlewares/error-handling.middleware';
import Container from 'typedi';
import { MetaContextEnum } from '~iotcon-models';
import { registerSwagger } from '../swagger';

require('dotenv').config({ path: join(process.cwd(), '../../.env') });

class App {
  public app: Application = express();

  constructor() {
    Container.set('context', MetaContextEnum.API_GATEWAY);
    Container.set(
      'contextPath',
      process.env.NODE_ENV === 'development'
        ? resolve(process.cwd())
        : undefined
    );

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    registerSwagger(this.app);
    router(this.app);

    errorHandlingMiddleware(this.app);
  }
}

export default new App().app;
