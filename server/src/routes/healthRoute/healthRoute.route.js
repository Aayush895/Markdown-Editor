import express from 'express';

export const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
  return res.send({
    message: 'Server is running fine',
  });
});
