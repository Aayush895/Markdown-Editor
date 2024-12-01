import { Route, Routes } from 'react-router-dom'
import style from './Container.module.css'
import Login from './Registeration/Login'
import Signup from './Registeration/Signup'
import withAuthProtection from './withAuthProtection'
import MarkdownEditor from './MarkdownEditor'

const ProtectedMarkdownComponent = withAuthProtection(MarkdownEditor)
function Container() {
  return (
    <div id={style.outerContainer}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/markdown" element={<ProtectedMarkdownComponent />} />
      </Routes>
    </div>
  )
}
export default Container
