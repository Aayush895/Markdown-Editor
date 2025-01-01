import { customFileFetcher } from '../../utils'

async function editFileApi(id, fileContent) {
  try {
    if (!id) {
      throw new Error('File ID is required')
    }

    if (fileContent === undefined) {
      throw new Error('File content is required')
    }

    const response = await customFileFetcher.patch(`/edit/${id}`, {
      content: fileContent,
      id: id,
    })

    if (!response?.data) {
      throw new Error('Invalid response from server')
    }

    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Server error: ${error.response.data?.message || error.response.status}`
      )
    } else if (error.request) {
      throw new Error('No response from server')
    } else {
      throw new Error(error.message || 'Failed to edit file')
    }
  }
}

export default editFileApi
