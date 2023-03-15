import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

export default function PrivateRoute({ children }) {
  const { isToken, isRememberMe } = useSelector((state) => state.auth)
  console.log('PrivateRoute isToken', isToken)
  //   useEffect(() => {
  if (!isToken) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/login" />
  }

  // if (isRememberMe === false) {
  //   console.log('PrivateRoute isRememberMe', isRememberMe)
  //   localStorage.removeItem('state')
  // }
  //   })

  // authorized so return child components
  return children
}
