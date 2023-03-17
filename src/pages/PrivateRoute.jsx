import { Navigate } from 'react-router-dom'
import { isGetTokenStorage } from '../utils/tokenStorageFunctions'

export default function PrivateRoute({ children }) {
  if (!isGetTokenStorage()) {
    // no token so redirect to login page with the return url
    return <Navigate to="/login" />
  }
  // authorized so return child components
  return children
  // ;<Outlet />
}
