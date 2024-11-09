import express from "express";
import healthcheckRouter from './healthcheckroutes.js'

const router = express.Router();

router.use("/healthcheck", healthcheckRouter);

export default router;
