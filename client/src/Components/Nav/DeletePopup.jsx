import { useContext } from 'react'
import { toast } from 'react-toastify'
import MarkdownContext from '../Context/MarkdownContext'
import Button from '../Button/Button'
import { deleteDocument } from '../Apis/documentApis'
import { fetchMarkdownFiles } from '../../Utils/utilFunctions'
import styles from '../../CSS/DeletePopup.module.css'

function DeletePopup({ fileName, setDeleteDoc, setFileName }) {
  const {
    setMarkdownContent,
    setmarkdownFiles,
    selectedFileId,
    setselectedFileId,
  } = useContext(MarkdownContext)
  async function handleDeleteDocument() {
    if (!selectedFileId) {
      return toast('Please select a file', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      })
    }
    const response = await deleteDocument(selectedFileId)
    await fetchMarkdownFiles(setmarkdownFiles)

    setFileName('Untitled-document')
    setMarkdownContent('')
    setselectedFileId(null)
    setDeleteDoc(false)
    return toast(`${response?.message}`, {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    })
  }

  return (
    <div id={styles.overlay}>
      <div id={styles.popupContainer}>
        <h1>Delete this document?</h1>
        <p>
          Are you sure you want to delete '{fileName}.md' and its contents? This
          action cannot be reversed.
        </p>
        <Button
          btnName={'Confirm & Delete'}
          btnFunc={handleDeleteDocument}
          customWidth={true}
        />
      </div>
    </div>
  )
}
export default DeletePopup
