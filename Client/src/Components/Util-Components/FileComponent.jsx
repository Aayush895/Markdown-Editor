import fileStore from '../../store/FileStore'
import { PropTypes } from 'prop-types'
import styles from './FileComponent.module.css'

function FileComponent({ name = 'untitled-document.md', date, fileId }) {
  const { setSelectedFileId, setIsFileTabVisible } = fileStore()
  function handleFileSelection() {
    setSelectedFileId({name, fileId})
    setIsFileTabVisible(true)
  }
  return (
    <div id={styles.fileContainer} onClick={handleFileSelection}>
      <img src="assets/icon-document.svg" alt="document" />
      <div id={styles.fileName}>
        <p>{new Date(date).toDateString().slice(4)}</p>
        <p>{name}</p>
      </div>
    </div>
  )
}

FileComponent.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  fileId: PropTypes.string,
}

export default FileComponent
