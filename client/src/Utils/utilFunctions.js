import { getDocuments } from '../Components/Apis/documentApis'

// TODO: Fix this util function
export async function fetchMarkdownFiles(
  isNewFileAdded,
  markdownFiles,
  setmarkdownFiles,
  setisNewFileAdded
) {
  const files = await getDocuments()
  console.log('LOGGING FILeS:', files)
  setmarkdownFiles([...markdownFiles, files])
  setisNewFileAdded(false)
}
