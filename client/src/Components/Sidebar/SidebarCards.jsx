import { CiFileOn } from 'react-icons/ci'
import styles from '../../CSS/SidebarCards.module.css'

function SidebarCards({
  date,
  selectedFileName,
  selectedFileContent,
  setFileName,
  setMarkdownContent,
}) {
  function handleFileSelection() {
    setFileName(selectedFileName)
    setMarkdownContent(selectedFileContent)
  }

  return (
    <div className={styles.document} onClick={handleFileSelection}>
      <CiFileOn size={30} style={{ marginRight: '0.7rem' }} />
      <div className={styles.docHeader}>
        <p>{date.slice(0, 10)}</p>
        <p>{`${selectedFileName}.md`}</p>
      </div>
    </div>
  )
}
export default SidebarCards
