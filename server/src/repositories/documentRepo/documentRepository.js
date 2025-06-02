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
  // Doing an eager initlization, where the document is created with default values on the click of a button
  try {
    const createDocument = await Document.create(documentDetails);
    return createDocument;
  } catch (error) {
    console.log(error);
    throw new Error('Could not create a new document in DB');
  }
}
