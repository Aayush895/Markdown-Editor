import express from 'express';
import {
  getDocuments,
  createDocument,
  editDocument,
  deleteFile,
} from '../../controller/documents.controller.js';

export const documentRouter = express.Router();

documentRouter.get('/', getDocuments);
documentRouter.post('/', createDocument);
documentRouter.patch('/:id', editDocument);
documentRouter.delete('/:id', deleteFile);
