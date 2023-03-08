import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
