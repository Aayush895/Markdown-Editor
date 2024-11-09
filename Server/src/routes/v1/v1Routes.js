import express from "express";
import healthcheckRouter from "./healthcheckroutes.js";
import usersRouter from "./usersRoute.js";

const router = express.Router();

router.use("/healthcheck", healthcheckRouter);
router.use("/users", usersRouter);

export default router;
