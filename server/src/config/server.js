import express from 'express';
import cors from 'cors';
import { healthRouter } from '../routes/healthRoute/healthRoute.route.js';
import { documentRouter } from '../routes/documentRoutes/documents.routes.js';

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use('/health', healthRouter);
app.use('/documents', documentRouter);
