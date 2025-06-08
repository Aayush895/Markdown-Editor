import { getDocuments } from '../Components/Apis/documentApis'

export async function fetchMarkdownFiles(setmarkdownFiles) {
  const files = await getDocuments()
  setmarkdownFiles(files)
}
