import { customFileFetcher } from '../../utils'

async function deleteFileApi(fileId) {
  const response = await customFileFetcher.delete(`/delete/${fileId}`, {
    id: fileId,
  })

  return response?.data
}

export default deleteFileApi
