import { StatusCodes } from "http-status-codes";
import {
  createDocumentService,
  deleteDocumentService,
  editDocsService,
  fetchAllDocsService,
} from "../services/documentService.js";

export async function createDocument(req, res, next) {
  try {
    const responseData = await createDocumentService({
      name: req.body.name,
      content: req.body.content,
      userDetails: req.user,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseData,
      message: "Document created successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    const { id } = req.params;
    await deleteDocumentService(id);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchAllDocs(req, res, next) {
  try {
    const responseData = await fetchAllDocsService();
    return res.status(StatusCodes.OK).json({
      success: true,
      data: responseData,
      message: "Documents were fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function editDocs(req, res, next) {
  try {
    const {name, content} = req.body
    const { id } = req.params;
    await editDocsService(name, content, id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Document was updated successfully",
    });
  } catch (error) {
    next(error);
  }
}
