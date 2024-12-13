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
      if (!accessToken) {
        navigate('/login')
        return
      }

      function handleTokenExpiration() {
        localStorage.removeItem('accessToken')
        setaccessToken(null)
        navigate('/login')
      }

      function initialCheck() {
        // Checking if the access token is generated or not
        if (
          data?.status == 200 &&
          data?.data?.message == 'New token generated'
        ) {
          setaccessToken(data?.data?.newAccessToken)
          console.log('Running local storgae function')
          localStorage.setItem('accessToken', data?.data?.newAccessToken)
        }

        if (
          error?.status == 401 &&
          error?.response?.data?.message == 'Access token has expired'
        ) {
          handleTokenExpiration()
          return
        }
        
        if (
          error?.status == 401 &&
          error?.response?.data?.message == 'Refresh token has expired'
        ) {
          handleTokenExpiration()
          return
        }
      }

      initialCheck()

      const checkUserIntervalId = setInterval(() => {
        checkUser(accessToken)
      }, 30 * 60 * 1000)

      return () => {
        clearInterval(checkUserIntervalId)
      }
    }, [accessToken, checkUser, navigate, error, setaccessToken, data])

    if (isPending) {
      return <Loader />
    }

    return <Component />
  }
}
export default withAuthProtection
