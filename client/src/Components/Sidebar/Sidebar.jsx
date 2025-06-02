import Button from '../Button/Button'
import { IoIosAdd } from 'react-icons/io'
import { CiFileOn } from 'react-icons/ci'
import styles from '../../CSS/Sidebar.module.css'

// TODO: On clicking the button 'new-document', a request should be sent to the backend and a file with default configs should be created. 
function Sidebar({ expand, markdownContent }) {
  return (
    <div
      id={styles.sideBarContainer}
      style={{ width: expand ? '15%' : '0', transition: 'linear 0.05s' }}
    >
      <div className={styles.header}>
        <p>MY DOCUMENTS</p>
      </div>
      <div className={styles.addDocument}>
        <Button btnIcon={<IoIosAdd />} btnName="New Document" />
      </div>
      <div className={styles.sideBarItems}>
        {/* Below will be the logic to load all the documents */}
        <div className={styles.document}>
          <CiFileOn size={30} style={{ marginRight: '0.7rem' }} />
          <div className={styles.docHeader}>
            <p>01 April 2025</p>
            <p>Sample-File-Name.md</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
