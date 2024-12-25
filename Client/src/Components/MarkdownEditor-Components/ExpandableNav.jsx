import FileComponent from '../Util-Components/FileComponent'
import CreateFile from '../Util-Components/CreateFile'
import { PropTypes } from 'prop-types'
import styles from './ExpandableNav.module.css'

function ExpandableNav({ setexpandNav, showCreatefile, setshowCreateFile }) {
  function handleExpandNav() {
    setexpandNav(false)
  }

  function handleShowCreateFileModal() {
    setshowCreateFile(true)
  }

  return (
    <>
      {showCreatefile && <CreateFile setshowCreateFile={setshowCreateFile}/>}
      <div id={styles.expandNavContainer}>
        <div id={styles.header}>
          <div id={styles.headerContent}>
            <h1>MY DOCUMENTS</h1>
            <img
              src="assets/icon-close.svg"
              alt="close-btn"
              onClick={handleExpandNav}
            />
          </div>
          <button onClick={handleShowCreateFileModal}>+ New Document</button>
        </div>

        <div id={styles.filesContainer}>
          <FileComponent />
        </div>
      </div>
    </>
  )
}

ExpandableNav.propTypes = {
  setexpandNav: PropTypes.func,
  showCreatefile: PropTypes.bool,
  setshowCreateFile: PropTypes.func
}
export default ExpandableNav
