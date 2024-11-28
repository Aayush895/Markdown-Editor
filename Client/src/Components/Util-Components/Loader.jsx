import CircleLoader from 'react-spinners/CircleLoader'
import style from './Loader.module.css'

function Loader() {
  return (
    <div className={style.loaderOverlay}>
      <div className={style.loaderContainer}>
        <CircleLoader color="#FF5733" size={150} loading={true} />
      </div>
    </div>
  )
}
export default Loader
