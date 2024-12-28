import { PropTypes } from 'prop-types'
import styles from './FileTab.module.css'

function FileTab({ fileName = 'untitled-document.md' }) {
  return (
    <div id={styles.fileTabContainer}>
      <div id={styles.docImage}>
        <img src="assets/icon-document.svg" alt="open-document" />
      </div>
      <div id={styles.fileTabHeader}>
        <p>Document Name</p>
        <p>{fileName}</p>
      </div>
    </div>
  )
}

FileTab.propTypes = {
  fileName: PropTypes.string,
}
export default FileTab
