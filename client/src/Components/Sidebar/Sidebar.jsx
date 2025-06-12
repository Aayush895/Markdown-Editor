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

function Sidebar({
  expand,
  fileName,
  setFileName,
  markdownContent,
  setMarkdownContent,
}) {
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

    setFileName('Untitled-document')
    setMarkdownContent('')
  }

  let width = 0;
  if(window.innerWidth > 1440) {
    width = '15%'
  } else if(window.innerWidth > 926) {
    width = '23%'
  } else {
    width = '100%'
  }

  return (
    <div
      id={styles.sideBarContainer}
      style={{
        width: expand ? width : '0',
        transition: 'linear 0.05s',
        overflow: expand ? null : 'hidden',
      }}
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
            selectedFileName={file?.name}
            selectedFileContent={file?.content}
            setFileName={setFileName}
            setMarkdownContent={setMarkdownContent}
            fileId={file?._id}
            key={file?._id}
          />
        ))}
      </div>
    </div>
  )
}
export default Sidebar
