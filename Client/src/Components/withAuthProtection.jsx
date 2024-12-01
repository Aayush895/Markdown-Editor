import { useState } from "react"
import { useAuth } from "../Hooks/customFetchHooks"

function withAuthProtection(Component) {
  return function ProtectedComponent() {
    const [isAuthenticated, setisAuthenticated] = useState(null)
    const {data, isError} = useAuth()
    
    return <Component />
  }
}
export default withAuthProtection
