import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './main.css'

import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import User from './pages/User.jsx'
// import Profil from './pages/Profil'
// import Error from './pages/Error'

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Home />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/user" element={<User />} />
          {/* <Route path="/erreurAPI" element={<Error errorNumber={503} />} />
          <Route path="/*" element={<Error errorNumber={404} />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
