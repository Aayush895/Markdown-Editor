import { useState } from 'react'
import { AuthContext } from './AuthContext'
import Container from './Components/Container'

function App() {
  const [accessToken, setaccessToken] = useState(localStorage.getItem("accessToken") || null)
  return (
    <>
      <AuthContext.Provider value={{ accessToken, setaccessToken }}>
        <Container />
      </AuthContext.Provider>
    </>
  )
}

export default App
