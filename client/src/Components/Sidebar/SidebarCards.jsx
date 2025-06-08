import { CiFileOn } from 'react-icons/ci'
import styles from '../../CSS/SidebarCards.module.css'

function SidebarCards({date, fileName}) {
  return (
    <div className={styles.document}>
      <CiFileOn size={30} style={{ marginRight: '0.7rem' }} />
      <div className={styles.docHeader}>
        <p>{date.slice(0, 10)}</p>
        <p>{`${fileName}.md`}</p>
      </div>
    </div>
  )
}
export default SidebarCards
