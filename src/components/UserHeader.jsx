import { Link } from 'react-router-dom'

import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'

export default function UserHeader() {
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
          <i className="fa fa-user-circle"></i> Tony{' '}
        </Link>
        <Link to="/" className="main-nav-item">
          <i className="fa fa-sign-out"></i> Sign Out
        </Link>
      </div>
    </nav>
  )
}
