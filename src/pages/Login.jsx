import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { thunkLogin, actionIsRememberMe } from '../storeRedux/auth'
import { setToken } from '../utils/tokenStorageFunctions'

import UserHeader from '../components/UserHeader.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
  })

  const { isRememberMe } = useSelector((state) => state.auth)

  const handleChecked = () => {
    dispatch(actionIsRememberMe())
    console.log('The checkbox was toggled', isRememberMe)
  }

  const handleLogin = (formValue) => {
    const { email, password } = formValue
    // console.log('Login', email, password)
    setLoading(true)

    dispatch(thunkLogin({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/profile')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div className="container">
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {/* <div className="col-md-12 login-form">
    <div className="card card-container"> 
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="input-wrapper">
                {/* <label htmlFor="email">Username</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  type="email"
                  className="alert alert-danger"
                /> */}
                <label htmlFor="email">Username</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
              <div className="input-remember">
                <input
                  type="checkbox"
                  id="remember-me"
                  onChange={handleChecked}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>

              <div className="input-wrapper">
                <button
                  type="submit"
                  // className="btn btn-primary btn-block"
                  className="sign-in-button"
                  disabled={loading}
                >
                  {/* {loading && (
                    // <span className="spinner-border spinner-border-sm"></span>
                    <p>loading...</p>
                  )} */}
                  <span>Sign In</span>
                </button>
              </div>
            </Form>
          </Formik>
          {/* </div> */}

          {/* {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )} */}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Login
