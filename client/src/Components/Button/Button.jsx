import styles from '../../CSS/Button.module.css'

function Button({ btnIcon, btnName, btnFunc }) {
  return (
    <button id={styles.button} onClick={btnFunc}>
      <span>{btnIcon}</span>
      {btnName}
    </button>
  )
}
export default Button
