import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { toast } from 'react-toastify'
import createFileApi from '../../Apis/createFileApi'
import fileStore from '../../store/FileStore'
import styles from './CreateFile.module.css'

function CreateFile({ setshowCreateFile }) {
  const [fileName, setfileName] = useState('')
  const { setisNewFileCreated } = fileStore()

  async function handleFileCreation() {
    if (!fileName) {
      return toast.error('Please enter the file name that you want to create')
    }
    const response = await createFileApi(fileName)

    if (response) {
      setshowCreateFile(false)
      setfileName('')
      setisNewFileCreated(true)
      return toast.success('File created successfully', {
        autoClose: 1500,
        pauseOnHover: false,
      })
    }
  }

  function handleCancelFileCreation() {
    setshowCreateFile(false)
    setisNewFileCreated(false)
  }

  function handleFileName(e) {
    setfileName(e.target.value)
  }

  return (
    <div id={styles.modalContainer}>
      <div id={styles.modalForm}>
        <div id={styles.modalHeader}>
          <h1>Create New File</h1>
        </div>

        <div id={styles.modalInput}>
          <p>File Name</p>
          <input
            type="text"
            name="fileName"
            value={fileName}
            onChange={handleFileName}
          />
          <span>
            <p>.md</p>
          </span>
        </div>

        <div id={styles.buttons}>
          <button onClick={handleFileCreation}>Create</button>
          <button onClick={handleCancelFileCreation}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

CreateFile.propTypes = {
  setshowCreateFile: PropTypes.func,
}
export default CreateFile
