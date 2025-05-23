import { useState } from 'react'
import Navbar from './Components/Nav/Navbar'
import Editor from './Components/Editor/Editor'
import Preview from './Components/Preview/Preview'
import Sidebar from './Components/Sidebar/Sidebar'
import styles from './App.module.css'

function App() {
  const [expand, setExpand] = useState(false)
  function handleSideBar() {
    setExpand(!expand)
  }

  return (
    <div id={styles.appContainer}>
      <Navbar expand={expand} handleSideBar={handleSideBar} />
      <div id={styles.editorPreviewContainer}>
        <Sidebar expand={expand}/>
        <Editor />
        <Preview />
      </div>
    </div>
  )
}

export default App
