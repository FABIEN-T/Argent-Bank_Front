import { Link } from 'react-router-dom'
import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { actionLogout } from '../storeRedux/auth'
import * as actions from '../storeRedux/auth'

export default function Header() {
  const { firstName, isToken } = useSelector((state) => state.auth)
  console.log('HEADER isToken', isToken)
  const dispatch = useDispatch()

  const logout = () => {
    console.log('Header logout()')
    dispatch(actionLogout())
  }

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
        <div>
          <Link to="/" className="main-nav-item">
            <i className="fa fa-user-circle"></i> {firstName}{' '}
          </Link>
          <Link
            to="/"
            className="main-nav-item"
            // onClick={dispatch(actions.actionLogout())}
            onClick={logout}
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
