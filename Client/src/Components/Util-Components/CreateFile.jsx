import { useState } from 'react'
import { PropTypes } from 'prop-types'
import styles from './CreateFile.module.css'
import { useCreateFile } from '../../Hooks/customFileHooks'
import { toast } from 'react-toastify'
import Loader from './Loader'

function CreateFile({ setshowCreateFile }) {
  const [fileName, setfileName] = useState('')
  const { createFile, isLoading, responseData } = useCreateFile()

  function handleFileCreation() {
    if (!fileName) {
      return toast.error('Please enter the file name that you want to create')
    }

    createFile(
      { name: fileName + '.md' },
      {
        onSuccess: () => {
          setshowCreateFile(false)
          setfileName('')
        },
      }
    )
  }

  function handleCancelFileCreation() {
    setshowCreateFile(false)
  }

  function handleFileName(e) {
    setfileName(e.target.value)
  }

  if (isLoading) {
    return <Loader />
  }

  console.log('RESPONSE DATA: ', responseData)
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
