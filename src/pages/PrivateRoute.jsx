import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children }) {
  const isToken = useSelector((state) => state.auth.isToken)
  if (isToken === false) {
    // si token inexistant redirection vers la page login
    return <Navigate to="/login" />
  }
  // si token existant retpouner child components
  return children
}
