import Document from '../../models/Documents.models.js';

export async function getDocumentsRepository() {
  try {
    const documents = await Document.find();
    return documents;
  } catch (error) {
    console.log(error);
    throw new Error('Could not fetch all the documents in DB');
  }
}

export async function createDocumentRepository(documentDetails) {
  try {
    // TODO: Check if the document of the same name exist or not
    // If it does then do not create the document
    
    const createDocument = await Document.create(documentDetails);
    return createDocument;
  } catch (error) {
    console.log(error);
    throw new Error('Could not create a new document in DB');
  }
}
