import express from "express";
import routehealthCheck from "../../controllers/healthcheck.controller.js";

const router = express.Router();

router.get("/", routehealthCheck);

export default router;
