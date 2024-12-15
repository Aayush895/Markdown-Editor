import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PropTypes } from 'prop-types'
import styles from './MarkdownPreview.module.css'

function MarkdownPreview({ rawMarkdownText }) {
  return (
    <div id={styles.previewContainer}>
      <div id={styles.header}>
        <h1>PREVIEW</h1>
        <img src="assets/icon-show-preview.svg" alt="preview" />
      </div>

      <div id={styles.preview}>
        {rawMarkdownText && (
          <Markdown remarkPlugins={[remarkGfm]}>{rawMarkdownText}</Markdown>
        )}
      </div>
    </div>
  )
}

MarkdownPreview.propTypes = {
  rawMarkdownText: PropTypes.string,
}
export default MarkdownPreview
