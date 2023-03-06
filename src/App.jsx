import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import store from './storeRedux/store'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './App.css'

import Login from './pages/Login'
// import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'

import { logout } from './storeRedux/auth'

import { useStore } from 'react-redux'

// import EventBus from './rangement/common/Eventbus.js'

function App() {
  // const { user: currentUser } = useSelector((state) => state.auth)
  // const dispatch = useDispatch()

  // const logOut = useCallback(() => {
  //   dispatch(logout())
  // }, [dispatch])

  // useEffect(() => {
  //   console.log('currentUser', currentUser)
  //   EventBus.on('logout', () => {
  //     logOut()
  //   })

  //   return () => {
  //     EventBus.remove('logout')
  //   }
  // }, [currentUser, logOut])
  // const viewStore = useStore()
  // console.log('APP isLoginOk', viewStore.getState().isLoginOk)
  const { isLoginOk, maVariable } = useSelector((state) => state.auth)
  useEffect(() => {
    console.log('APP isLoginOk', isLoginOk)
    console.log('APP maVariable', maVariable)
  })

  return (
    <Router>
      <div>
        {/* <nav>
          <Link to={'/'} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={'/home'} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser && (
              <li className="nav-item">
                <Link to={'/user'} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/profile'} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav> */}

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
