import { useEffect } from 'react'
import FileComponent from '../Util-Components/FileComponent'
import CreateFile from '../Util-Components/CreateFile'
import fileStore from '../../store/FileStore'
import { PropTypes } from 'prop-types'
import fetchAllFiles from '../../Apis/fetchFilesApi'
import styles from './ExpandableNav.module.css'

function ExpandableNav({
  setexpandNav,
  showCreatefile,
  setshowCreateFile,
  setrawMarkdownText,
  setshowPreview,
}) {
  const { fileList, isnewFileCreated, setFileList, setisNewFileCreated } =
    fileStore()
  function handleExpandNav() {
    setexpandNav(false)
  }

  function handleShowCreateFileModal() {
    setshowCreateFile(true)
  }

  useEffect(() => {
    async function getAllFiles() {
      const files = await fetchAllFiles()
      setFileList(files)
      setisNewFileCreated(false)
    }

    getAllFiles()
  }, [isnewFileCreated, setFileList, setisNewFileCreated])

  return (
    <>
      {showCreatefile && <CreateFile setshowCreateFile={setshowCreateFile} />}
      <div id={styles.expandNavContainer}>
        <div id={styles.header}>
          <div id={styles.headerContent}>
            <h1>MY DOCUMENTS</h1>
            <img
              src="assets/icon-close.svg"
              alt="close-btn"
              onClick={handleExpandNav}
            />
          </div>
          <button onClick={handleShowCreateFileModal}>+ New Document</button>
        </div>

        <div id={styles.filesContainer}>
          {fileList.success &&
            fileList.data.map((file) => (
              <FileComponent
                key={file._id}
                name={file.name}
                content={file.content}
                date={file.createdAt}
                fileId={file._id}
                setexpandNav={setexpandNav}
                setrawMarkdownText={setrawMarkdownText}
                setshowPreview={setshowPreview}
              />
            ))}
        </div>
      </div>
    </>
  )
}

ExpandableNav.propTypes = {
  setexpandNav: PropTypes.func,
  showCreatefile: PropTypes.bool,
  setshowCreateFile: PropTypes.func,
  setrawMarkdownText: PropTypes.func,
  setshowPreview: PropTypes.func
}
export default ExpandableNav
