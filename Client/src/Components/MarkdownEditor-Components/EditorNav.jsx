import { useContext } from 'react'
import {PropTypes} from 'prop-types'
import { AuthContext } from '../../AuthContext'
import styles from './EditorNav.module.css'

function EditorNav({setexpandNav}) {
  let { userData } = useContext(AuthContext)
  userData = JSON.parse(userData)

  function handleExpandableNav() {
    setexpandNav(true)
  }
  return (
    <nav id={styles.navContainer}>
      <div id={styles.navHeader}>
        <div id={styles.expandableNavLogo} onClick={handleExpandableNav}>
          <img src="assets/icon-menu.svg" alt="icon-menu" />
        </div>
        <h1>MARKDOWN</h1>
      </div>

      <div id={styles.navItems}>
        <div id={styles.userInfo}>
          <h1>Welcome, {userData?.username}</h1>
          <div id={styles.profileImg}>
            <img src={userData?.profilePic} alt="profilePic" />
          </div>
        </div>
        <img src="assets/icon-delete.svg" alt="delete" />
        <button>
          <span>
            <img src="assets/icon-save.svg" alt="save" />
          </span>
          Save Changes
        </button>
      </div>
    </nav>
  )
}

EditorNav.propTypes = {
  setexpandNav: PropTypes.func
}
export default EditorNav
