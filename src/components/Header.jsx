import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { actionLogout } from '../_features/auth.slice.js'

import LogoArgentBank from '../img/argentBankLogo.png'

export default function Header() {
  const { firstName, isToken } = useSelector((state) => state.auth)
  // récupération des élements du state
  const dispatch = useDispatch()

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
        // si token présent : le menu de navigation inclut le prénom de l'utilisateur et le lien de déconnexion
        <div className="main-nav-items">
          <Link to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i> {firstName}{' '}
          </Link>
          <div className="main-nav-gap"></div>
          <Link
            to="/"
            className="main-nav-item"
            onClick={() => {
              dispatch(actionLogout())
            }}
          >
            <i className="fa fa-sign-out"></i> Sign Out
          </Link>
        </div>
      ) : (
        // si token absent : le menu de navigation inclut le lien de connexion
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      )}
    </nav>
  )
}
