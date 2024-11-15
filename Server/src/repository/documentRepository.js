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
