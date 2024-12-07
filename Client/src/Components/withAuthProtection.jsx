import { useContext, useEffect } from 'react'
import { useAuth } from '../Hooks/customFetchHooks'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Util-Components/Loader'

function withAuthProtection(Component) {
  return function ProtectedComponent() {
    const { accessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const { checkUser, isPending, data, error } = useAuth()

    useEffect(() => {
      if (!accessToken) {
        navigate('/login')
        return
      }

      function handleTokenExpiration() {
        localStorage.removeItem('accessToken')
        navigate('/login')
      }

      function initialCheck() {
        console.log('RUNNING INTIAL CHECK')
        if (error?.status == 401) {
          handleTokenExpiration()
          return
        }
      }

      initialCheck()

      const checkUserIntervalId = setInterval(() => {
        console.log('RUNNING INTERVAL CHECKS')
        checkUser(accessToken)
      }, 15000)

      return () => {
        clearInterval(checkUserIntervalId)
      }
    }, [accessToken, checkUser, navigate, error])

    if (isPending) {
      return <Loader />
    }

    console.log(data);
    
    return <Component />
  }
}
export default withAuthProtection
