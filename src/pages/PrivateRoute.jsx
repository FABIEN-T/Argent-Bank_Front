import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const { isToken } = useSelector((state) => state.auth)
  console.log('PrivateRoute isToken', isToken)
  //   useEffect(() => {
  if (!isToken) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />
  }

  // authorized so return child components
  return children
}
