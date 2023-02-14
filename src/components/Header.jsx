import { Link } from 'react-router-dom'
import '../main.css'
import LogoArgentBank from '../img/argentBankLogo.png'

export default function Header() {
  return (
    <nav className="main-nav">
      <Link to="/signup" className="main-nav-logo">
        <img
          src={LogoArgentBank}
          alt="Logo de l'entreprise SportSee"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/login" className="main-nav-item">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  )
}
