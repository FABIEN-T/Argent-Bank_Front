import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  actionIsRememberMe,
  actionInitErrorMessage,
} from '../_features/auth.slice.js'
import { mwLogin } from '../_middlewares/middlewares'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, errorMessage } = useSelector((state) => state.auth)

  useEffect(() => {
    errorMessage === 'Network Error' && navigate('/errorAPI')
  }) // récupération des élements du state

  const handleChecked = () => {
    // appel de l'action "toggle" du checkbox "Remember me" du formulaire d'authentification
    dispatch(actionIsRememberMe())
  }

  const save = (e) => {
    const { email, password } = e
    // appel de l'action réinitialisation du message d'erreur
    dispatch(actionInitErrorMessage())
    // appel de l'action Authentification de l'Utilisateur
    dispatch(mwLogin({ email, password })).then(() => {
      navigate('/profile')
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <div className="col-md-12 login-form"></div>
          <div className="input-wrapper">
            <label>Username</label>
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              {...register('email', {
                required: true,
                pattern: /^[\w._-]+@[\w-]+\.[a-z]{2,4}$/g,
              })}
            />
            <div className="inputError">
              {errors?.email?.type === 'required' && (
                <p className="pErrorlogin">This field is required</p>
              )}
              {errors?.email?.type === 'pattern' && (
                <p className="pErrorlogin">Email invalid</p>
              )}
            </div>
          </div>

          <div className="input-wrapper">
            <label>Password</label>
            <input
              label="Password"
              type="password"
              name="password"
              placeholder="at least 6 characters"
              {...register('password', {
                required: true,
                minLength: 6,
              })}
            />
            <div className="inputError">
              {errors?.password?.type === 'required' && (
                <p className="pErrorlogin">This field is required</p>
              )}
              {errors?.password?.type === 'minLength' && (
                <p className="pErrorlogin">
                  At least 6 characters for Password
                </p>
              )}
            </div>
          </div>

          <div className="input-remember">
            <input type="checkbox" id="remember-me" onChange={handleChecked} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <div className="input-wrapper">
            <button
              type="submit"
              className="sign-in-button"
              onClick={handleSubmit(save)}
            >
              <span>Sign In</span>
            </button>
            {isLoading && <p>LOADING...</p>}
            {errorMessage === 'Error: User not found!' && (
              <p>Error: User not found!</p>
            )}
            {errorMessage === 'Error: Password is invalid' && (
              <p>Error: Password is invalid</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Login
