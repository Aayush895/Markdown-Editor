import express from 'express';
import {
  getDocuments,
  createDocument,
} from '../../controller/documents.controller.js';

export const documentRouter = express.Router();

documentRouter.get('/', getDocuments);
documentRouter.post('/', createDocument);
// documentRouter.delete('/:id', deleteDocumentById);
