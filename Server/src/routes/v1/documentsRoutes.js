import express from "express";
import { createDocument } from "../../controllers/documents.controller.js";
import { validateRequestData } from "../../middlewares/zodMiddleware.js";
import { documentCreationSchema } from "../../validators/documentSchema.js";
import { jwtValidation } from "../../middlewares/jwtValidationMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  validateRequestData(documentCreationSchema),
  jwtValidation,
  createDocument
);

export default router;
