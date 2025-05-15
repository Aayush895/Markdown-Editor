import express from 'express';
import cors from 'cors';
import { healthRouter } from '../routes/healthRoute/healthRoute.route.js';

export const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/health', healthRouter);
