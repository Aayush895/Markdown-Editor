import styles from '../../CSS/Button.module.css'

function Button({ btnIcon, btnName }) {
  return (
    <button id={styles.button}>
      <span>{btnIcon}</span>
      {btnName}
    </button>
  )
}
export default Button
