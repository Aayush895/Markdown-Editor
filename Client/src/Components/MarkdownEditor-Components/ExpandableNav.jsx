import FileComponent from '../Util-Components/FileComponent'
import { PropTypes } from 'prop-types'
import styles from './ExpandableNav.module.css'

function ExpandableNav({ setexpandNav }) {
  function handleExpandNav() {
    setexpandNav(false)
  }

  return (
    <div id={styles.expandNavContainer}>
      <div id={styles.header}>
        <div id={styles.headerContent}>
          <h1>MY DOCUMENTS</h1>
          <img src="assets/icon-close.svg" alt="close-btn" onClick={handleExpandNav}/>
        </div>
        <button>+ New Document</button>
      </div>

      <div id={styles.filesContainer}>
        <FileComponent />
      </div>
    </div>
  )
}

ExpandableNav.propTypes = {
  setexpandNav: PropTypes.func,
}
export default ExpandableNav
