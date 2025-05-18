import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from '../../CSS/Preview.module.css'

function Preview() {
  const text = ` # Sample text here `
  return (
    <div id={styles.previewContainer}>
      <div id={styles.header}>
        <p>PREVIEW</p>
      </div>
      <div id={styles.preview}>
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </div>
    </div>
  )
}
export default Preview
