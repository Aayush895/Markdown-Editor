import { useContext } from 'react'
import styles from './EditorNav.module.css'
import { AuthContext } from '../../AuthContext'

function EditorNav() {
  let { userData } = useContext(AuthContext)
  userData = JSON.parse(userData)
  return (
    <nav id={styles.navContainer}>
      <div id={styles.navHeader}>
        <div id={styles.expandableNavLogo}>
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
export default EditorNav
