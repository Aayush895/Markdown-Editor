import { useState, useRef } from 'react'
import style from './Signup.module.css'
import { useRegisterUser } from '../../Hooks/customFetchHooks'
import { toast } from 'react-toastify'
import Loader from '../Util-Components/Loader'

function Signup() {
  const [userObj, setuserObj] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
  })

  const fileInputRef = useRef(null)
  const { registerUser, isPending } = useRegisterUser()

  function handleInputChange(e) {
    const { name, value } = e.target
    setuserObj({
      ...userObj,
      [name]: value,
    })
  }

  function handleFile(e) {
    setuserObj({
      ...userObj,
      profilePic: e.target.files[0],
    })
  }

  function handleFormSubmission(e) {
    e.preventDefault()
    if (
      !userObj.username ||
      !userObj.email ||
      !userObj.password ||
      !userObj.profilePic
    ) {
      return toast.error('Please fill the details in the sign-up form!')
    }

    registerUser(userObj, {
      onSuccess: () => {
        // Reset form fields after successful submission
        setuserObj({
          username: '',
          email: '',
          password: '',
          profilePic: '',
        })
        fileInputRef.current.value = ''
        return toast.success('User registered!')
      },
    })
  }

  return (
    <div id={style.signupContainer}>
      {isPending && <Loader />}
      <div id={style.signupFormContainer}>
        <div id={style.formHeader}>
          <h1>Welcome to Markdown editor</h1>
          <p>Create your account</p>
        </div>
        <form action="post" onSubmit={handleFormSubmission}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={userObj.username}
            onChange={handleInputChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userObj.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userObj.password}
            onChange={handleInputChange}
          />

          <label htmlFor="profilePic">Upload profile picture</label>
          <input
            type="file"
            name="profilePic"
            onChange={handleFile}
            ref={fileInputRef}
          />

          <button type="submit" disabled={isPending}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}
export default Signup
