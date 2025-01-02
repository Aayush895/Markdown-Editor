import { useContext, useEffect } from 'react'
import { useAuth } from '../Hooks/customFetchHooks'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Util-Components/Loader'

function withAuthProtection(Component) {
  return function ProtectedComponent() {
    const { accessToken, setaccessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const { checkUser, isPending, data, error } = useAuth()
    // After the initial render is done for the protected component we check if the users tokens are valid or not
    // If they are valid keep them in the page otherwise take them back to the login page
    useEffect(() => {
      // Only run the initial check if we have an access token
      if (!accessToken) {
        navigate('/login')
        return
      }

      // Run the initial check just once when the component mounts
      const initialCheck = async () => {
        try {
          await checkUser(accessToken)
        } catch (err) {
          // Error handling can be done here if needed
          console.error('Initial auth check failed:', err)
        }
      }

      initialCheck()
    }, [])

    useEffect(() => {
      if (!data && !error) return // Skip if we don't have a response yet

      if (error?.status === 401) {
        if (
          error.response?.data?.message === 'Refresh Token not received' ||
          error.response?.data?.message === 'Access token has expired' ||
          error.response?.data?.message === 'Refresh token has expired'
        ) {
          localStorage.removeItem('accessToken')
          setaccessToken(null)
          navigate('/login')
          return
        }
      }

      if (
        data?.status === 200 &&
        data?.data?.message === 'New token generated'
      ) {
        setaccessToken(data.data.newAccessToken)
        localStorage.setItem('accessToken', data.data.newAccessToken)
      }
    }, [data, error, navigate, setaccessToken])

    useEffect(() => {
      const checkUserIntervalId = setInterval(() => {
        checkUser(accessToken)
      }, 30 * 60 * 1000)

      return () => {
        clearInterval(checkUserIntervalId)
      }
    }, [accessToken, checkUser])

    if (isPending) {
      return <Loader />
    }

    return <Component />
  }
}
export default withAuthProtection
