import React from 'react'
import { useForm } from 'react-hook-form'

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Username" {...register('Username', {})} />
      <input
        type="password"
        placeholder="Password"
        {...register('Password', {})}
      />

      <input type="submit" />
    </form>
  )
}

;<form>
  <div className="input-wrapper">
    <label for="username">Username</label>
    <input type="text" id="username" />
  </div>
  <div className="input-wrapper">
    <label for="password">Password</label>
    <input type="password" id="password" />
  </div>
  <div className="input-remember">
    <input type="checkbox" id="remember-me" />
    <label for="remember-me">Remember me</label>
  </div>
  {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
  <a href="./user.html" className="sign-in-button">
    Sign In
  </a>
  {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
  {/* <!-- <button className="sign-in-button">Sign In</button> --> */}
  {/* <!--  --> */}
</form>
