import { useEffect } from 'react'
import { fetchMarkdownFiles } from '../Utils/utilFunctions'

export function useFetchFile(markdownFiles, setmarkdownFiles) {
  useEffect(() => {
    fetchMarkdownFiles(setmarkdownFiles)
  }, [])

  return markdownFiles
}
