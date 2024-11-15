import { StatusCodes } from "http-status-codes";
import { createDocumentService } from "../services/documentService.js";

export async function createDocument(req, res, next) {
  try {
    const responseData = await createDocumentService({
      name: req.body.name,
      content: req.body.content,
      userDetails: req.user,
    });

    console.log(responseData);
    
    return res.status(StatusCodes.CREATED).json({
      success: true,
      data: responseData,
      message: "Document created successfully",
    });
  } catch (error) {
    next(error)
  }
}
