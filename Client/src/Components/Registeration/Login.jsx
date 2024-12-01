import { useState } from 'react'
import Loader from '../Util-Components/Loader'
import style from './Login.module.css'
import { useLogin } from '../../Hooks/customFetchHooks'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Login() {
  const [userInfo, setuserInfo] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [accessToken, setaccessToken] = useState(null)

  const { loginUser, isPending, data } = useLogin()

  function handleInputChange(e) {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  function handleFormSubmission(e) {
    e.preventDefault()
    if (!userInfo.username || !userInfo.email || !userInfo.password) {
      return toast.error('Please enter the form details!')
    }

    loginUser(userInfo, {
      onSuccess: () => {
        setuserInfo({
          username: '',
          email: '',
          password: '',
        })

        return toast.success('User logged in successfully!')
      },
    })
  }
  console.log(data?.data?.accessToken)
  
  return (
    <div id={style.loginContainer}>
      {isPending && <Loader />}
      <div id={style.loginFormContainer}>
        <div id={style.formHeader}>
          <h1>Welcome Back!</h1>
          <p>Login to your account</p>
        </div>
        <form action="post" onSubmit={handleFormSubmission}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
          />

          <button type="submit">Login</button>
        </form>
        <p>
          Don&apos;t have an account?{' '}
          <span>
            <Link to="/signup" className={style.signupLink}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}
export default Login
