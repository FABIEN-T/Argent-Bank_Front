import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute'
import Profile from './pages/Profile'
// import Toggle from './pages/Toggle'
import Error from './pages/Error'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        {/* <Route path="/toggle" element={<Toggle />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
