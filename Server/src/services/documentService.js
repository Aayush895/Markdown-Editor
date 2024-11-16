import { StatusCodes } from "http-status-codes";
import {
  createNewDocument,
  checkDocumentExist,
  deleteDocumentRepo,
  fetchDocsRepo,
  editDocsRepo,
} from "../repository/documentRepository.js";
import ApiError from "../utils/ApiError.js";

export async function createDocumentService({ name, content, userDetails }) {
  try {
    const doesDocumentExist = await checkDocumentExist(name);

    if (doesDocumentExist) {
      throw new ApiError(
        "Document of this name already exists!",
        StatusCodes.BAD_REQUEST
      );
    }

    const createnewDocument = await createNewDocument({
      name,
      content,
      userDetails,
    });

    return createnewDocument;
  } catch (error) {
    // Propagate the error to the controller
    if (!(error instanceof ApiError)) {
      // In case a non-ApiError is thrown (for example, unexpected errors), throw a general internal server error
      throw new ApiError(
        "An unexpected error occurred. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    // If it is an instance of ApiError, just rethrow it as it has the correct status and message
    throw error;
  }
}

export async function deleteDocumentService(documentId) {
  try {
    const deleteDoc = await deleteDocumentRepo(documentId);

    if (!deleteDoc) {
      throw new ApiError("Document not found", StatusCodes.NOT_FOUND);
    }

    return deleteDoc;
  } catch (error) {
    throw new ApiError(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function fetchAllDocsService() {
  try {
    const fetchedDocs = await fetchDocsRepo();
    return fetchedDocs;
  } catch (error) {
    throw new ApiError(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function editDocsService(name, content, docId) {
  try {
    const editedDocs = await editDocsRepo(name, content, docId)
    return editedDocs
  } catch (error) {
    throw new ApiError(
      "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}