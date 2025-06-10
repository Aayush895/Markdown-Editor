import { useContext, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { CiFileOn } from 'react-icons/ci'
import { IoIosSave } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Button from '../Button/Button'
import styles from '../../CSS/Navbar.module.css'
import MarkdownContext from '../Context/MarkdownContext'
import { deleteDocument } from '../Apis/documentApis'
import { toast } from 'react-toastify'
import { fetchMarkdownFiles } from '../../Utils/utilFunctions'

function Navbar({
  expand,
  handleSideBar,
  fileName,
  setFileName,
  setMarkdownContent,
}) {
  const { selectedFileId, setselectedFileId, setmarkdownFiles } = useContext(MarkdownContext)
  const [isEditActive, setisEditActive] = useState(false)

  function handleFileName(e) {
    setFileName(e.target.value)
  }

  async function handleDeleteFile() {
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
    return toast(`${response?.message}`, {
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    })
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
          style={{ color: '#5A6069', cursor: 'pointer' }}
          onClick={handleDeleteFile}
        />
        <Button btnIcon={<IoIosSave size={25} />} btnName="Save Changes" />
      </div>
    </div>
  )
}

export default Navbar
