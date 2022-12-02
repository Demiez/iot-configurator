import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

require('dotenv').config();

class App {
  public app = express();

  constructor() {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.get('/api/v1', (req: Request, res: Response) => {
      res.status(200).send({ status: 'ok' });
    });
  }
}

export default new App().app;
