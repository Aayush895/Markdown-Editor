import { useState } from 'react'
import MarkdownContext from './Components/Context/MarkdownContext'
import Navbar from './Components/Nav/Navbar'
import Editor from './Components/Editor/Editor'
import Preview from './Components/Preview/Preview'
import Sidebar from './Components/Sidebar/Sidebar'
import styles from './App.module.css'

function App() {
  const [fileName, setFileName] = useState('Untitled-document')
  const [markdownContent, setMarkdownContent] = useState('')
  const [expand, setExpand] = useState(false)

  function handleSideBar() {
    setExpand(!expand)
  }

  return (
    <MarkdownContext.Provider value={{ markdownContent, setMarkdownContent }}>
      <div id={styles.appContainer}>
        <Navbar
          expand={expand}
          handleSideBar={handleSideBar}
          fileName={fileName}
          setFileName={setFileName}
        />
        <div id={styles.editorPreviewContainer}>
          <Sidebar
            expand={expand}
            fileName={fileName}
            markdownContent={markdownContent}
          />
          <Editor />
          <Preview />
        </div>
      </div>
    </MarkdownContext.Provider>
  )
}

export default App
