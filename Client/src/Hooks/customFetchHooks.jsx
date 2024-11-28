import { QueryClient, useMutation } from '@tanstack/react-query'
import { customFetch } from '../../utils'
import { toast } from 'react-toastify'

export function useRegisterUser() {
  const queryClient = new QueryClient()
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (user) => {
      const formData = new FormData()
      formData.append('username', user.username)
      formData.append('email', user.email)
      formData.append('password', user.password)
      formData.append('profilePic', user.profilePic)

      return customFetch.post('/users/register', formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg || error.message
      return toast.error(errorMsg)
    },
  })

  return { registerUser, isPending }
}
