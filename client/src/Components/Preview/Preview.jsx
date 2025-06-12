import { useContext } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import MarkdownContext from '../Context/MarkdownContext'
import styles from '../../CSS/Preview.module.css'

function Preview({ preview }) {
  const { markdownContent } = useContext(MarkdownContext)
  let width = 0
  if(window.innerWidth > 926) {
    width = '50%'
  } else {
    width = '100%'
  }

  return (
    <div
      id={styles.previewContainer}
      style={{ width: preview ? '100%' : width }}
    >
      <div id={styles.header}>
        <p>PREVIEW</p>
      </div>
      <div id={styles.preview}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={{
            // Convert line breaks to actual <br> tags
            p: ({ children }) => {
              return <p>{children}</p>
            },
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              const language = match ? match[1] : ''

              return !inline && language ? (
                <SyntaxHighlighter
                  style={oneLight}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    margin: '1.5rem 0',
                    border: '1px solid #e1e4e8',
                    backgroundColor: '#fafbfc',
                    fontFamily: "'Courier New', Monaco, Consolas, monospace",
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '16px',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdownContent}
        </Markdown>
      </div>
    </div>
  )
}

export default Preview
