import { customFileFetcher } from '../../utils'

async function createFileApi(fileName) {
  const response = await customFileFetcher.post('/create', {
    name: fileName + '.md',
  })

  return response?.data
}

export default createFileApi
