import { useContext } from 'react'
import { useFetchFile } from '../../Hooks/useFetchFile'
import { toast } from 'react-toastify'
import { IoIosAdd } from 'react-icons/io'
import { createDocument } from '../Apis/documentApis'
import { fetchMarkdownFiles } from '../../Utils/utilFunctions'
import MarkdownContext from '../Context/MarkdownContext'
import Button from '../Button/Button'
import SidebarCards from './SidebarCards'
import styles from '../../CSS/Sidebar.module.css'

// TODO: Should show the contents of the particular file when a file is selected from the sidebar

function Sidebar({ expand, fileName, markdownContent }) {
  const { markdownFiles, setmarkdownFiles } = useContext(MarkdownContext)
  const fetchedFiles = useFetchFile(markdownFiles, setmarkdownFiles)
  async function handleCreateDocument() {
    const response = await createDocument({
      docName: fileName,
      docBody: markdownContent,
    })

    toast(response?.message, {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    })

    await fetchMarkdownFiles(setmarkdownFiles)
    console.log('LOGGING RESPONSE', response)
  }

  return (
    <div
      id={styles.sideBarContainer}
      style={{ width: expand ? '15%' : '0', transition: 'linear 0.05s' }}
    >
      <div className={styles.header}>
        <p>MY DOCUMENTS</p>
      </div>
      <div className={styles.addDocument}>
        <Button
          btnIcon={<IoIosAdd />}
          btnName="New Document"
          btnFunc={handleCreateDocument}
        />
      </div>
      <div className={styles.sideBarItems}>
        {fetchedFiles?.documents.map((file) => (
          <SidebarCards
            date={file?.createdAt}
            fileName={file?.name}
            key={file?._id}
          />
        ))}
      </div>
    </div>
  )
}
export default Sidebar
