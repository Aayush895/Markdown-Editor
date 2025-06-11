import styles from '../../CSS/Button.module.css'

function Button({ btnIcon, btnName, btnFunc, customWidth=false }) {
  return (
    <button
      id={styles.button}
      onClick={btnFunc}
      style={{
        width: customWidth ? '100%' : null,
        justifyContent: customWidth ? 'center' : null,
      }}
    >
      <span>{btnIcon}</span>
      {btnName}
    </button>
  )
}
export default Button
