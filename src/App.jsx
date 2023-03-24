import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute'
import Profile from './pages/Profile'
import Error from './pages/Error'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/errorAPI" element={<Error errorNumber={500} />} />
        <Route path="/*" element={<Error errorNumber={404} />} />
      </Routes>
    </Router>
  )
}

export default App
