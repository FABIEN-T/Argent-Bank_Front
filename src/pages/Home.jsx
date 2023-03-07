import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTokenStorage } from '../utils/tokenStorageFunctions.js'
import { setTokenAction, thunkGetUserName } from '../storeRedux/auth'

import '../main.css'

export default function Home() {
  const dispatch = useDispatch()
  const typeStorage = false // true: localStorage || false: sessionStorage
  const tokenStorage = getTokenStorage(typeStorage)
    ? getTokenStorage(typeStorage)
    : null

  useEffect(() => {
    console.log('HOME tokenStorage', tokenStorage)
    if (tokenStorage !== null) {
      dispatch(setTokenAction(tokenStorage))
      dispatch(thunkGetUserName())
    }
  })

  return (
    <div className="container">
      <Header />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
