import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import router from './core/router';
import process from 'process';
import { join } from 'path';
import errorHandlingMiddleware from './core/middlewares/error-handling.middleware';

require('dotenv').config({ path: join(process.cwd(), '../../.env') });

class App {
  public app = express();

  constructor() {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    router(this.app);

    errorHandlingMiddleware(this.app);
  }
}

export default new App().app;
