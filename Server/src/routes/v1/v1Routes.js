import express from "express";
import healthcheckRouter from "./healthcheckroutes.js";
import usersRouter from "./usersRoute.js";
import documentsRouter from './documentsRoutes.js';

const router = express.Router();

router.use("/healthcheck", healthcheckRouter);
router.use("/users", usersRouter);
router.use("/documents", documentsRouter);

export default router;
