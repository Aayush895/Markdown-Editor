import { customFileFetcher } from '../../utils'

async function fetchAllFiles() {
  const response = await customFileFetcher.get('/get-docs')

  return response.data
}

export default fetchAllFiles
