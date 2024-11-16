import express from "express";
import {
  createDocument,
  deleteDocument,
  editDocs,
  fetchAllDocs,
} from "../../controllers/documents.controller.js";
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

router.get("/get-docs", jwtValidation, fetchAllDocs);
router.patch("/edit/:id", jwtValidation, editDocs)

router.delete("/delete/:id", jwtValidation, deleteDocument);
export default router;
