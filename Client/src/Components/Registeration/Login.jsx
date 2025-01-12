import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../Util-Components/Loader'
import { useLogin } from '../../Hooks/customFetchHooks'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthContext'
import style from './Login.module.css'

function Login() {
  const navigate = useNavigate()
  const [userInfo, setuserInfo] = useState({
    username: '',
    email: '',
    password: '',
  })
  const { setaccessToken, setuserData } = useContext(AuthContext)
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

        if (data && data?.data?.accessToken) {
          setaccessToken(data?.data?.accessToken)
          localStorage.setItem('accessToken', data?.data?.accessToken)
        }

        if (data && data?.data?.data) {
          setuserData(data?.data?.data)
          localStorage.setItem('user', JSON.stringify(data?.data?.data))
        }

        navigate('/markdown')
      },
    })
  }

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
            <Link to="/" className={style.signupLink}>
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}
export default Login
