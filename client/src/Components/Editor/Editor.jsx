import { useContext } from 'react'
import MarkdownContext from '../Context/MarkdownContext'
import styles from '../../CSS/Editor.module.css'

function Editor() {
  const { markdownContent, setMarkdownContent } = useContext(MarkdownContext)

  function handleMarkDownInput(e) {
    e.preventDefault()
    setMarkdownContent(e.target.value)
  }
  return (
    <div id={styles.editorContainer}>
      <div id={styles.header}>
        <p>MARKDOWN</p>
      </div>

      <div id={styles.editor}>
        <textarea
          value={markdownContent}
          onChange={handleMarkDownInput}
          placeholder="Welcome to the Editor..."
        />
      </div>
    </div>
  )
}
export default Editor
