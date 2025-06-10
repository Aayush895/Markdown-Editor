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

export async function editDocumentRepository(name, content, id) {
  try {
    const doesDocExist = await Document.findById(id);

    if (!doesDocExist) {
      throw new Error('File does not exist');
    }

    const updatedDoc = await Document.findByIdAndUpdate(id, { name, content });

    if (!updatedDoc) {
      throw new Error('File was not updated successfully');
    }
    const findUpdatedDoc = await Document.findById(id);
    if(!findUpdatedDoc) {
      throw new Error('Updated doc not found')
    }
    
    return findUpdatedDoc;
  } catch (error) {
    console.log(error);
    throw new Error('Could not update the document in DB');
  }
}

export async function deleteFileRepository(id) {
  try {
    const doesDocExist = await Document.findById(id);

    if (!doesDocExist) {
      throw new Error(
        'File does not exist in the DB, please provide a valid file ID'
      );
    }

    await Document.findByIdAndDelete(id);
    return doesDocExist;
  } catch (error) {
    console.log(error);
    throw new Error('Could not delete document in DB');
  }
}
