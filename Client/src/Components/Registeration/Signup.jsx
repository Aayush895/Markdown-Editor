import style from './Signup.module.css'

function Signup() {
  return (
    <div id={style.signupContainer}>
      <div id={style.signupFormContainer}>
        <div id={style.formHeader}>
          <h1>Welcome to Markdown editor</h1>
          <p>Create your account</p>
        </div>
        <form action="post">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" />

          <label htmlFor="profilePic">Upload profile picture</label>
          <input type="file" name="profilePic" />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}
export default Signup