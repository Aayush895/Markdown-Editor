import { QueryClient, useMutation } from '@tanstack/react-query'
import { customFetch, customLoginFetcher } from '../../utils'
import { toast } from 'react-toastify'

export function useRegisterUser() {
  const queryClient = new QueryClient()
  const {
    mutate: registerUser,
    isPending,
    data,
  } = useMutation({
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

  return { registerUser, isPending, data }
}

export function useLogin() {
  const queryClient = new QueryClient()
  const {
    mutate: loginUser,
    isPending,
    data,
  } = useMutation({
    mutationFn: (userInfo) => {
      return customLoginFetcher.post('/users/login', userInfo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return { loginUser, isPending, data }
}

export function useAuth() {
  const queryClient = new QueryClient()
  const {
    mutate: checkUser,
    isPending,
    isError,
    data,
    error
  } = useMutation({
    mutationFn: async (accessToken) => {
      return await customLoginFetcher.post('/users/check', { accessToken })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.msg || error.message
      return toast.error(errorMsg)
    },
  })

  return { checkUser, isPending, isError, data, error }
}
