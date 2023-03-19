import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
// import 'bootstrap/dist/css/bootstrap.min.css'

import { actionIsRememberMe } from '../storeRedux/auth'
import { thunkLogin } from '../storeRedux/thunks'
import { actionHome } from '../storeRedux/auth'
import { setToken } from '../utils/tokenStorageFunctions'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  // // useEffect(() => {
  // dispatch(actionHome())
  // // })

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('This field is required!')
      .email('Email is invalid'),
    password: Yup.string()
      .required('This field is required!')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  })

  const { isRememberMe, isLoading, errorMessage } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    console.log('LOGIN errorMessage : ', errorMessage)
    errorMessage === 'Network Error' && navigate('/erreurAPI')
  })

  const handleChecked = () => {
    dispatch(actionIsRememberMe())
    // console.log('The checkbox was toggled', isRememberMe)
  }

  const handleLogin = (formValue) => {
    const { email, password } = formValue
    // console.log('Login', email, password)
    // setLoading(false)
    dispatch(actionHome())
    dispatch(thunkLogin({ email, password }))
      // .unwrap()
      .then(() => {
        navigate('/profile')
      })
    // .catch(() => {
    //   // setLoading(true)
    // })
  }

  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <div className="col-md-12 login-form"></div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, resetForm }) => (
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
                    // className="alert alert-danger"
                    className="alertInput"
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
                    className="alertInput"
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
                    // disabled={loading}
                  >
                    <span>Sign In</span>
                  </button>
                  {isLoading && (
                    // <span className="spinner-border spinner-border-sm"></span>
                    <p>LOADING...</p>
                  )}
                  {errorMessage === 'Error: User not found!' && (
                    <p>Error: User not found!</p>
                  )}
                  {errorMessage === 'Error: Password is invalid' && (
                    <p>Error: Password is invalid</p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
          {/* </div> */}

          {/* {errorMessage === 'Network Error' && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                LOADING...
              </div> */}
          {/* <div className="alert alert-danger" role="alert">
                veuillez réessayer plus tard !
              </div> */}
          {/* </div>
          )} */}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Login
