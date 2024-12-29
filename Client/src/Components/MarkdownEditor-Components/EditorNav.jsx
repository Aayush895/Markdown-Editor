import { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { AuthContext } from '../../AuthContext'
import styles from './EditorNav.module.css'
import FileTab from '../Util-Components/FileTab'
import fileStore from '../../store/FileStore'
import editFileApi from '../../Apis/editFileContentApi'
import deleteFileApi from '../../Apis/deleteFilesApi'
import { toast } from 'react-toastify'

function EditorNav({ setexpandNav, rawMarkdownText, setrawMarkdownText }) {
  let { userData } = useContext(AuthContext)
  const { isFileTabVisible, selectedFileId, setIsFileTabVisible } = fileStore()
  userData = JSON.parse(userData)

  function handleExpandableNav() {
    setexpandNav(true)
  }

  async function handleSaveChanges() {
    const editContent = await editFileApi(selectedFileId.id, rawMarkdownText)
    return toast.success(editContent.message, {
      autoClose: 500,
      pauseOnHover: false,
    })
  }

  async function handeFileDeletion() {
    const deleteFile = await deleteFileApi(selectedFileId.id)
    setrawMarkdownText('')
    setIsFileTabVisible(false)
    return toast.success(deleteFile.message, {
      autoClose: 500,
      pauseOnHover: false,
    })
  }

  return (
    <nav id={styles.navContainer}>
      <div id={styles.navHeader}>
        <div id={styles.expandableNavLogo} onClick={handleExpandableNav}>
          <img src="assets/icon-menu.svg" alt="icon-menu" />
        </div>
        <h1>MARKDOWN</h1>
        {isFileTabVisible ? <FileTab fileName={selectedFileId.name} /> : null}
      </div>

      <div id={styles.navItems}>
        <div id={styles.userInfo}>
          <h1>Welcome, {userData?.username}</h1>
          <div id={styles.profileImg}>
            <img src={userData?.profilePic} alt="profilePic" />
          </div>
        </div>
        <img
          src="assets/icon-delete.svg"
          alt="delete"
          onClick={handeFileDeletion}
        />
        <button onClick={handleSaveChanges}>
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
  setexpandNav: PropTypes.func,
  rawMarkdownText: PropTypes.string,
  setrawMarkdownText: PropTypes.func,
}
export default EditorNav
