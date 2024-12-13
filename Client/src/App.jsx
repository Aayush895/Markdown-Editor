import { useState } from 'react'
import { AuthContext } from './AuthContext'
import Container from './Components/Container'

function App() {
  const [accessToken, setaccessToken] = useState(
    localStorage.getItem('accessToken') || null
  )
  const [userData, setuserData] = useState(localStorage.getItem('user') || null)
  return (
    <>
      <AuthContext.Provider
        value={{ accessToken, setaccessToken, userData, setuserData }}
      >
        <Container />
      </AuthContext.Provider>
    </>
  )
}

export default App
