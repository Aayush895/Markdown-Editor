import Navbar from './Components/Nav/Navbar'
import Editor from './Components/Editor/Editor'
import styles from './App.module.css'
import Preview from './Components/Preview/Preview'

function App() {
  return (
    <div id={styles.appContainer}>
      <Navbar />

      <div id={styles.editorPreviewContainer}>
        <Editor />
        <Preview />
      </div>
    </div>
  )
}

export default App
