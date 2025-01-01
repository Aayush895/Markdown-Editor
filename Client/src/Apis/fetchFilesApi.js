import { customFileFetcher } from '../../utils'

async function fetchAllFiles() {
  try {
    const response = await customFileFetcher.get('/get-docs')

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
      throw new Error(error.message || 'Failed to fetch files')
    }
  }
}

export default fetchAllFiles
