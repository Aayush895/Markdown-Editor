import { useState } from 'react'
import styles from '../../CSS/Editor.module.css'

function Editor() {
  const [markdownInput, setMarkdownInput] = useState('')

  function handleMarkDownInput(e) {
    e.preventDefault()
    setMarkdownInput(e.target.value)
  }
  return (
    <div id={styles.editorContainer}>
      <div id={styles.header}>
        <p>MARKDOWN</p>
      </div>
      
      <div id={styles.editor}>
        <textarea
          value={markdownInput}
          onChange={handleMarkDownInput}
          placeholder="Welcome to the Editor..."
        />
      </div>
    </div>
  )
}
export default Editor
