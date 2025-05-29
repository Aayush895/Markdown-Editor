import { useContext } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarkdownContext from '../Context/MarkdownContext'
import styles from '../../CSS/Preview.module.css'

function Preview() {
  const { markdownContent } = useContext(MarkdownContext)

  return (
    <div id={styles.previewContainer}>
      <div id={styles.header}>
        <p>PREVIEW</p>
      </div>
      <div id={styles.preview}>
        <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
      </div>
    </div>
  )
}
export default Preview
