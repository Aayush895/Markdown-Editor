import { useContext } from 'react'
import { CiFileOn } from 'react-icons/ci'
import styles from '../../CSS/SidebarCards.module.css'
import MarkdownContext from '../Context/MarkdownContext'

function SidebarCards({
  date,
  selectedFileName,
  selectedFileContent,
  setFileName,
  setMarkdownContent,
  fileId,
}) {
  const { setselectedFileId } = useContext(MarkdownContext)
  function handleFileSelection() {
    setselectedFileId(fileId)
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
