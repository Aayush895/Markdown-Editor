import { useState, useEffect } from 'react'
import { fetchMarkdownFiles } from '../Utils/utilFunctions'

// TODO: Have to fix this custom hook
export function useFetchFile(isNewFileAdded, setisNewFileAdded) {
  const [markdownFiles, setmarkdownFiles] = useState([])

  useEffect(() => {
    if (isNewFileAdded || markdownFiles.length == 0) {
      fetchMarkdownFiles(
        isNewFileAdded,
        setisNewFileAdded,
        markdownFiles,
        setmarkdownFiles
      )
    }
  }, [isNewFileAdded])

  return markdownFiles
}
