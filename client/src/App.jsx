import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import MarkdownContext from './Components/Context/MarkdownContext'
import Navbar from './Components/Nav/Navbar'
import Editor from './Components/Editor/Editor'
import Preview from './Components/Preview/Preview'
import Sidebar from './Components/Sidebar/Sidebar'
import styles from './App.module.css'

function App() {
  const [fileName, setFileName] = useState('Untitled-document')
  const [markdownContent, setMarkdownContent] = useState('')
  const [markdownFiles, setmarkdownFiles] = useState(null)
  const [expand, setExpand] = useState(false)

  function handleSideBar() {
    setExpand(!expand)
  }

  return (
    <MarkdownContext.Provider
      value={{
        markdownContent,
        setMarkdownContent,
        markdownFiles,
        setmarkdownFiles,
      }}
    >
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
            setFileName={setFileName}
            markdownContent={markdownContent}
            setMarkdownContent={setMarkdownContent}
          />
          <Editor />
          <Preview />
        </div>
      </div>
      <ToastContainer />
    </MarkdownContext.Provider>
  )
}

export default App
