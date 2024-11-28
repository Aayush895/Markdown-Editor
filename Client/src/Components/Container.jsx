import style from './Container.module.css'
import Login from './Registeration/Login'
import Signup from './Registeration/Signup'

function Container() {
  return (
    <div id={style.outerContainer}>
      {/* <Signup /> */}
      <Login />
    </div>
  )
}
export default Container