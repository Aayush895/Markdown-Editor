import style from './Container.module.css'
import Signup from './Registeration/Signup'

function Container() {
  return (
    <div id={style.outerContainer}>
      <Signup />
    </div>
  )
}
export default Container