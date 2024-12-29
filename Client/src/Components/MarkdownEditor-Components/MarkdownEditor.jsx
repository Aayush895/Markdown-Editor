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
  const [showPreview, setshowPreview] = useState(false)
  return (
    <div id={styles.container}>
      {expandNav ? (
        <ExpandableNav
          setexpandNav={setexpandNav}
          showCreatefile={showCreatefile}
          setshowCreateFile={setshowCreateFile}
          setrawMarkdownText={setrawMarkdownText}
          setshowPreview={setshowPreview}
        />
      ) : null}
      <EditorNav
        setexpandNav={setexpandNav}
        rawMarkdownText={rawMarkdownText}
        setrawMarkdownText={setrawMarkdownText}
        setshowPreview={setshowPreview}
      />
      <div id={styles.markDownContainer}>
        {showPreview ? (
          <>
            <RawInputText
              rawMarkdownText={rawMarkdownText}
              setrawMarkdownText={setrawMarkdownText}
            />
            <MarkdownPreview rawMarkdownText={rawMarkdownText} />
          </>
        ) : (
          <div id={styles.noContentPreview}>
            <h1>Select a file to view the preview</h1>
          </div>
        )}
      </div>
    </div>
  )
}
export default MarkdownEditor
