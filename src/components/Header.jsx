import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { actionLogout } from '../storeRedux/auth'

import { removeState } from '../utils/stateStorageFunctions'
// import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'

export default function Header() {
  const { firstName, isRememberMe, isToken } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()
  // const isToken = isGetTokenStorage()

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
      {isToken ? ( // isLogin à enlever ? : && isLogin === false
        <div className="main-nav-items">
          {/* <div className="circleName">
            <i className="fa fa-user-circle"></i>
            <div className="faFirstName">{firstName} </div>
          </div> */}

          <Link to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i> {firstName}{' '}
          </Link>
          <div className="main-nav-gap"></div>
          <Link
            to="/"
            className="main-nav-item"
            onClick={() => {
              dispatch(actionLogout())
              // removeState(isRememberMe)
            }}
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        </div>
      ) : (
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      )}
    </nav>
  )
}
