import { useState } from 'react'
import EditorNav from './EditorNav'
import RawInputText from './RawInputText'
import styles from './MarkdownEditor.module.css'
import MarkdownPreview from './MarkdownPreview'

function MarkdownEditor() {
  const [rawMarkdownText, setrawMarkdownText] = useState('')
  return (
    <div id={styles.container}>
      <EditorNav />
      <div id={styles.markDownContainer}>
        <RawInputText rawMarkdownText={rawMarkdownText} setrawMarkdownText={setrawMarkdownText}/>
        <MarkdownPreview rawMarkdownText={rawMarkdownText}/>
      </div>
    </div>
  )
}
export default MarkdownEditor
