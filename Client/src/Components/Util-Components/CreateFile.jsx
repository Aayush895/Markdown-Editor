import { PropTypes } from 'prop-types'
import styles from './CreateFile.module.css'

function CreateFile({ setshowCreateFile }) {
  function handleCancelFileCreation() {
    setshowCreateFile(false)
  }

  return (
    <div id={styles.modalContainer}>
      <div id={styles.modalForm}>
        <div id={styles.modalHeader}>
          <h1>Create New File</h1>
        </div>

        <div id={styles.modalInput}>
          <p>File Name</p>
          <input type="text" name="fileName" />
          <span>
            <p>.md</p>
          </span>
        </div>

        <div id={styles.buttons}>
          <button>Create</button>
          <button onClick={handleCancelFileCreation}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

CreateFile.propTypes = {
  setshowCreateFile: PropTypes.func
}
export default CreateFile
