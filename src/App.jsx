import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'

// import Header from './components/Header'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile.jsx'
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
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/profile"
            element={
              // <PrivateRoute>
              <Profile />
              // </PrivateRoute>
            }
          /> */}
          <Route path="*" element={<Error errorNumber={404} />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  )
}
