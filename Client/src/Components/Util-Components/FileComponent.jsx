import styles from './FileComponent.module.css';

function FileComponent() {
  return (
    <div id={styles.fileContainer}>
      <img src="assets/icon-document.svg" alt="document" />
      <div id={styles.fileName}>
        <p>{new Date().toDateString().slice(4)}</p>
        <p>untitled-document.md</p>
      </div>
    </div>
  )
}
export default FileComponent