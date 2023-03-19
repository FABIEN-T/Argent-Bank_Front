import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  removeTokenStorage,
  isGetTokenStorage,
} from '../utils/tokenStorageFunctions'

export default function PrivateRoute({ children }) {
  const isToken = useSelector((state) => state.auth.isToken)
  // console.log('PRIVATE isToken', isToken, isGetTokenStorage())
  // useEffect(() => {
  // if (isGetTokenStorage() === false) {
  if (isToken === false) {
    // no token so redirect to login page with the return url
    return <Navigate to="/login" />
  }
  // }, [isToken])

  // authorized so return child components
  return children
  // ;<Outlet />
}
