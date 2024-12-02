import { useContext, useEffect, useState } from 'react'
import { useAuth } from '../Hooks/customFetchHooks'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

function withAuthProtection(Component) {
  return function ProtectedComponent() {
    const { accessToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const { checkUser, data, isError } = useAuth()

    useEffect(() => {
      console.log(accessToken)
      if (!accessToken) {
        navigate('/login')
        return
      }
      checkUser(accessToken)
    }, [])

    console.log(data);
    
    return <Component />
  }
}
export default withAuthProtection
