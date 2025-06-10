import {
  getDocumentsRepository,
  createDocumentRepository,
  editDocumentRepository,
  deleteFileRepository,
} from '../repositories/documentRepo/documentRepository.js';

export async function getDocuments(req, res) {
  try {
    const documents = await getDocumentsRepository();
    return res.status(200).send({
      documents,
      message: 'All documents were fetched successfully',
      success: true,
    });
  } catch (error) {
    console.log('Something went wrong when fetching the documents: ', error);
    res.status(500).send('Error fetching the documents');
  }
}

export async function createDocument(req, res) {
  try {
    const { name, content } = req.body;

    if (!name) {
      throw new Error('Please provide the name of the document');
    }

    const document = await createDocumentRepository({ name, content });
    if (!document) {
      throw new Error('There was an error when creating the document');
    }

    console.log('LOGGING CREATED DOCUMENT: ', document);
    return res.status(200).send({
      document,
      message: 'Document was created successfully',
      success: true,
    });
  } catch (error) {
    console.log('Something went wrong when creating the document: ', error);
    res.status(500).send('Error creating the document');
  }
}

export async function editDocument(req, res) {
  try {
    const { name, content } = req.body;
    const { id } = req.params;

    if (!id) {
      throw new Error('Please provide file id');
    }

    const updatedDoc = await editDocumentRepository(name, content, id);
    return res.status(200).send({
      document: updatedDoc,
      message: 'Document was updated successfully',
      success: true,
    });
  } catch (error) {
    console.log('Something went wrong when updating the document: ', error);
    res.status(500).send('Error updating the document');
  }
}

export async function deleteFile(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error('Please provide file id');
    }

    const deletedFile = await deleteFileRepository(id);

    return res.status(200).send({
      fileName: deletedFile?.name,
      message: `${deletedFile?.name}.md File was deleted successfully`,
      success: true,
    });
  } catch (error) {
    console.log('Something went wrong when deleting the document: ', error);
    res.status(500).send('Error deleting  the document');
  }
}
