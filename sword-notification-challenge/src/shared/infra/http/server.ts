import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());

// middleware para upload
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
});
app.listen(3333, () => {
  console.log('🚀 Notification Server started on port 3333');
});
