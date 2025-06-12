import { useContext, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CiFileOn } from 'react-icons/ci'
import { IoIosSave } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Button from '../Button/Button'
import styles from '../../CSS/Navbar.module.css'
import MarkdownContext from '../Context/MarkdownContext'
import { editDocument } from '../Apis/documentApis'
import { toast } from 'react-toastify'
import { fetchMarkdownFiles } from '../../Utils/utilFunctions'
import DeletePopup from './DeletePopup'

function Navbar({
  expand,
  handleSideBar,
  fileName,
  setFileName,
}) {
  const {
    markdownContent,
    selectedFileId,
    setmarkdownFiles,
    deleteDoc,
    setDeleteDoc,
  } = useContext(MarkdownContext)

  const [isEditActive, setisEditActive] = useState(false)
  
  function handleFileName(e) {
    setFileName(e.target.value)
  }

  async function handleSaveChanges() {
    if (!selectedFileId) {
      return toast('Please select a file you want to update', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      })
    }

    const response = await editDocument(selectedFileId, {
      docName: fileName,
      docBody: markdownContent,
    })

    await fetchMarkdownFiles(setmarkdownFiles)
    return toast(`${response?.message}`, {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    })
  }

  function handleDeleteFilepopup() {
    if (!selectedFileId) {
      return toast('Please select a file', {
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      })
    }
    setDeleteDoc(true)
  }

  return (
    <div id={styles.navContainer}>
      <div className={styles.navHeader}>
        <div className={styles.navLogo}>
          {expand ? (
            <AiOutlineClose
              size={90}
              style={{
                backgroundColor: '#35393F',
                padding: '1rem 0.5rem',
                cursor: 'pointer',
              }}
              onClick={handleSideBar}
            />
          ) : (
            <RxHamburgerMenu
              size={90}
              style={{
                backgroundColor: '#35393F',
                padding: '1rem 0.5rem',
                cursor: 'pointer',
              }}
              onClick={handleSideBar}
            />
          )}

          <p>MARKDOWN</p>
        </div>
        <div className={styles.docHeader}>
          <CiFileOn size={30} />
          <div className={styles.docName}>
            <p>Document Name</p>
            {isEditActive ? (
              <input
                value={`${fileName}`}
                onChange={handleFileName}
                className={styles.editFileName}
                onBlur={() => setisEditActive(false)}
              />
            ) : (
              <p onClick={() => setisEditActive(true)}>{`${fileName}.md`}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.navEditBtns}>
        <RiDeleteBin6Line
          size={40}
          className={styles.deleteBtn}
          style={{ color: '#5A6069', cursor: 'pointer' }}
          onClick={handleDeleteFilepopup}
        />
        {window.innerWidth <= 926 ? (
          <Button
            btnIcon={<IoIosSave size={25} />}
            btnName={null}
            btnFunc={handleSaveChanges}
          />
        ) : (
          <Button
            btnIcon={<IoIosSave size={25} />}
            btnName="Save Changes"
            btnFunc={handleSaveChanges}
          />
        )}
      </div>

      {deleteDoc && selectedFileId ? (
        <DeletePopup
          fileName={fileName}
          setDeleteDoc={setDeleteDoc}
          setFileName={setFileName}
        />
      ) : null}
    </div>
  )
}

export default Navbar
