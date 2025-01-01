import { customFileFetcher } from '../../utils'

async function deleteFileApi(fileId) {
  try {
    if (!fileId) {
      throw new Error('File ID is required')
    }

    const response = await customFileFetcher.delete(`/delete/${fileId}`, {
      id: fileId,
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
      throw new Error(error.message || 'Failed to delete file')
    }
  }
}

export default deleteFileApi
