/* eslint-disable no-undef */
import { app } from './config/server.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('App is running on port 3000');
});
