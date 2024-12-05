import { useContext, useEffect } from 'react'
import { useAuth } from '../Hooks/customFetchHooks'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import Loader from './Util-Components/Loader'

function withAuthProtection(Component) {
  return function ProtectedComponent() {
    const { accessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const { checkUser, isPending, data } = useAuth()

    useEffect(() => {
      let isComponentMounted = true

      if (!accessToken) {
        navigate('/login')
        return () => {
          isComponentMounted = false
        }
      }

      if(isComponentMounted) checkUser(accessToken)

      return () => {
        isComponentMounted = false
      }
    }, [accessToken, checkUser, navigate])

    console.log(data)
    if (isPending) {
      return <Loader />
    }

    return <Component />
  }
}
export default withAuthProtection
