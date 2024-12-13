import {PropTypes} from "prop-types"
import styles from './RawInputText.module.css'

function RawInputText({ rawMarkdownText, setrawMarkdownText }) {
  function handleRawText(e) {
    const { value } = e.traget
    setrawMarkdownText(value)
  }

  return (
    <div id={styles.textAreaContainer}>
      <div id={styles.header}>
        <h1>MARKDOWN</h1>
      </div>
      <textarea
        name="mdRawtext"
        placeholder="Please enter your raw text here..."
        value={rawMarkdownText}
        onChange={handleRawText}
      />
    </div>
  )
}

RawInputText.propTypes = {
  rawMarkdownText: PropTypes.string,
  setrawMarkdownText: PropTypes.func
}
export default RawInputText
