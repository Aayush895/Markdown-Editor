import { customFileFetcher } from '../../utils'

async function editFileApi(id, fileContent) {
  const response = await customFileFetcher.patch(`/edit/${id}`, {
    content: fileContent,
    id: id,
  })

  return response?.data
}

export default editFileApi
