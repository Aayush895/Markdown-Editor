import { Document } from "../models/document.models.js";
import ApiError from "../utils/ApiError.js";

export async function checkDocumentExist(name) {
  try {
    const doesDocumentExist = await Document.findOne({ $or: [{ name }] });
    return doesDocumentExist;
  } catch (error) {
    throw new ApiError(
      "Database error while checking if document exists",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function createNewDocument({ name, content, userDetails }) {
  try {
    const newDoc = await Document.create({
      name,
      content,
      createdBy: userDetails,
    });

    return newDoc;
  } catch (error) {
    throw new ApiError(
      "Database error while creating a new document",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function deleteDocumentRepo(documentId) {
  try {
    const deleteDoc = await Document.findByIdAndDelete(documentId);
    return deleteDoc;
  } catch (error) {
    throw new ApiError(
      "Database error while deleting a document",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function fetchDocsRepo() {
  try {
    const fetchDocs = await Document.find();
    return fetchDocs;
  } catch (error) {
    throw new ApiError(
      "Database error while fetching a document",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

export async function editDocsRepo(name, content, docId) {
  try {
    const updatedDoc = await Document.findByIdAndUpdate(
      {
        _id: docId,
      },
      {
        name,
        content,
      }
    );
    return updatedDoc;
  } catch (error) {
    throw new ApiError(
      "Database error while updating a document",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
