import { useState } from 'react'
import EditorNav from './EditorNav'
import RawInputText from './RawInputText'

function MarkdownEditor() {
  const [rawMarkdownText, setrawMarkdownText] = useState('')
  return (
    <>
      <EditorNav />
      <div>
        <RawInputText rawMarkdownText={rawMarkdownText} setrawMarkdownText={setrawMarkdownText}/>
      </div>
    </>
  )
}
export default MarkdownEditor
