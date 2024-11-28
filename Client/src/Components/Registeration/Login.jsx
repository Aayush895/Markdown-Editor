import Loader from '../Util-Components/Loader'
import style from './Login.module.css'

function Login() {
  return (
    <div id={style.loginContainer}>
      {/* {<Loader />} */}
      <div id={style.loginFormContainer}>
        <div id={style.formHeader}>
          <h1>Welcome Back!</h1>
          <p>Login to your account</p>
        </div>
        <form action="post">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" />

          <button type="submit">Login</button>
        </form>
        <p>Don&apos;t have an account? <span>Sign up</span></p>
      </div>
    </div>
  )
}
export default Login
