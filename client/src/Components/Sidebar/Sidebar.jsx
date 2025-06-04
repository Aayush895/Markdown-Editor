import { useContext, useEffect } from 'react'
import Button from '../Button/Button'
import { IoIosAdd } from 'react-icons/io'
import { CiFileOn } from 'react-icons/ci'
import styles from '../../CSS/Sidebar.module.css'
import { createDocument, getDocuments } from '../Apis/documentApis'
import MarkdownContext from '../Context/MarkdownContext'

// TODO: Should show a notification when the document is created successfully
// TODO: Should also update the list of documents in the sidebar when new file is created and also show the contents of the particular file when a file is selected from the sidebar

function Sidebar({ expand, fileName, markdownContent }) {
  const { markdownFiles, setmarkdownFiles, isNewFileAdded, setisNewFileAdded } =
    useContext(MarkdownContext)
  async function handleCreateDocument() {
    const response = await createDocument({
      docName: fileName,
      docBody: markdownContent,
    })

    setisNewFileAdded(true)
    console.log('LOGGING RESPONSE', response)
  }

  async function fetchMarkdownFiles() {
    if(isNewFileAdded) {
      const files = await getDocuments()
      console.log('LOGGING FILeS:', files)
      setmarkdownFiles([...markdownFiles, files])
      setisNewFileAdded(false)
    }
  }

  useEffect(() => {
    fetchMarkdownFiles()
  }, [isNewFileAdded])

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
        {/* Below will be the logic to load all the documents */}
        <div className={styles.document}>
          <CiFileOn size={30} style={{ marginRight: '0.7rem' }} />
          <div className={styles.docHeader}>
            <p>01 April 2025</p>
            <p>Sample-File-Name.md</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
