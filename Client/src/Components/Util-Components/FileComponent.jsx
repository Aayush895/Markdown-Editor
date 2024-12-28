import fileStore from '../../store/FileStore'
import { PropTypes } from 'prop-types'
import styles from './FileComponent.module.css'

function FileComponent({
  name = 'untitled-document.md',
  content,
  date,
  fileId,
  setexpandNav,
  setrawMarkdownText,
}) {
  const { setSelectedFileId, setIsFileTabVisible } = fileStore()
  function handleFileSelection() {
    setSelectedFileId({ name, id: fileId })
    setIsFileTabVisible(true)
    setexpandNav(false)
    setrawMarkdownText(content)
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
  content: PropTypes.string,
  date: PropTypes.string,
  fileId: PropTypes.string,
  setexpandNav: PropTypes.func,
  setrawMarkdownText: PropTypes.func
}

export default FileComponent
