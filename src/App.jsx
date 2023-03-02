import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'

// import Header from './components/Header'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import User from './pages/User.jsx'
import Error from './pages/Error.jsx'
// import Footer from './components/Footer'
// import Profil from './pages/Profil'
// import Error from './pages/Error'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* renommer en profile */}
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<User />} />
          {/* <Route path="/erreurAPI" element={<Error errorNumber={503} />} /> */}
          <Route path="*" element={<Error errorNumber={404} />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  )
}
