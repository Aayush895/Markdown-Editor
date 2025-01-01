import { customFileFetcher } from '../../utils'

async function createFileApi(fileName) {
  try {
    if (!fileName) {
      throw new Error('File name is required')
    }

    const response = await customFileFetcher.post('/create', {
      name: fileName + '.md',
      content: '',
    })

    if (!response?.data) {
      throw new Error('Invalid response from server')
    }

    return response.data
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      throw new Error(
        `Server error: ${error.response.data?.message || error.response.status}`
      )
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server')
    } else {
      // Other errors
      throw new Error(error.message || 'Failed to create file')
    }
  }
}

export default createFileApi
