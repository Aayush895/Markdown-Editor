import express from 'express';
import cors from 'cors';
import { healthRouter } from '../routes/healthRoute/healthRoute.route.js';
import { documentRouter } from '../routes/documentRoutes/documents.routes.js';

export const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://markdown-editor-hymyome0e-aayush895s-projects.vercel.app/',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Include if using cookies or headers requiring credentials
  })
);

app.use('/health', healthRouter);
app.use('/documents', documentRouter);
