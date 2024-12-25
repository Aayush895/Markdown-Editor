import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { customFileFetcher } from '../../utils'

export function useCreateFile() {
  const {
    mutate: createFile,
    isLoading,
    data: responseData,
  } = useMutation({
    mutationFn: (newFileData) => {
      return customFileFetcher.post('/documents/create', newFileData)
    },
    onSuccess: () => {
      return toast.success('A new file was created successfully')
    },
    onError: () => {
      return toast.error('An error occured when creating the file')
    },
  })

  return { createFile, isLoading, responseData }
}
