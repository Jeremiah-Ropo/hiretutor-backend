import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';


import './utils/connection';
import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import {PORT} from '../src/config';
import { CustomError } from './utils/response/custom-error/CustomError';

export const app = express();
// app.set('trust proxy', true);
app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'GET,PUT,POST,DELETE,PATCH,UPDATE');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,UPDATE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Cache-Control',
  );
  next();
});

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.get('/health', (req, res) => {
  res.send({
    code: 200,
    message: 'Server running....',
  });
});

app.use('/', routes);
app.use('*', (req, res, next) => {
  return next(new CustomError(404, 'Raw', "Route doesn't exist"));
});

app.use(errorHandler);

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status;
  res.status(status);
});

const port = PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
