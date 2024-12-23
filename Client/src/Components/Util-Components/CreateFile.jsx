import styles from './CreateFile.module.css'

function CreateFile() {
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
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}
export default CreateFile
