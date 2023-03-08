import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
// import { actionLogout } from '../storeRedux/auth'

import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'

export default function UserHeader() {
  // const myStore = useStore()
  const { firstName } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  // useEffect(() => {
  // console.log('UserHeader STATE', myStore.getState().auth)
  // function logout() {
  //   dispatch(actionLogout())
  // }
  // }, [dispatch])
  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          src={LogoArgentBank}
          alt="Logo de l'entreprise SportSee"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/" className="main-nav-item">
          <i className="fa fa-user-circle"></i> {firstName}{' '}
        </Link>
        <Link
          to="/"
          className="main-nav-item"
          // onClick={logout()}
        >
          <i className="fa fa-sign-out"></i> Sign Out
        </Link>
      </div>
    </nav>
  )
}
