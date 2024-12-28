import { useState } from 'react'
import EditorNav from './EditorNav'
import RawInputText from './RawInputText'
import MarkdownPreview from './MarkdownPreview'
import ExpandableNav from './ExpandableNav'
import styles from './MarkdownEditor.module.css'

function MarkdownEditor() {
  const [rawMarkdownText, setrawMarkdownText] = useState('')
  const [expandNav, setexpandNav] = useState(false)
  const [showCreatefile, setshowCreateFile] = useState(false)
  return (
    <div id={styles.container}>
      {expandNav ? (
        <ExpandableNav
          setexpandNav={setexpandNav}
          showCreatefile={showCreatefile}
          setshowCreateFile={setshowCreateFile}
        />
      ) : null}
      <EditorNav setexpandNav={setexpandNav} rawMarkdownText={rawMarkdownText}/>
      <div id={styles.markDownContainer}>
        <RawInputText
          rawMarkdownText={rawMarkdownText}
          setrawMarkdownText={setrawMarkdownText}
        />
        <MarkdownPreview rawMarkdownText={rawMarkdownText} />
      </div>
    </div>
  )
}
export default MarkdownEditor
