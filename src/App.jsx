import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Toggle from './pages/Toggle'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/toggle" element={<Toggle />} />
      </Routes>
    </Router>
  )
}

export default App
