import { Link } from 'react-router-dom'
import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'
import { useSelector, useDispatch } from 'react-redux'
import { actionLogout } from '../storeRedux/auth'

import { isGetTokenStorage } from '../utils/tokenStorageFunctions'

export default function Header() {
  const { firstName } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const isToken = isGetTokenStorage()
  console.log('HEADER isToken, isToken')

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
      {isToken ? (
        <div className="headerLink">
          {/* <div className="circleName">
            <i className="fa fa-user-circle"></i>
            <div className="faFirstName">{firstName} </div>
          </div> */}

          <Link to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i> {firstName}{' '}
          </Link>
          <Link
            to="/home"
            className="main-nav-item"
            onClick={() => dispatch(actionLogout())}
          >
            {/* <i className="fa fa-user-circle"></i> {firstName}{' '} */}
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
