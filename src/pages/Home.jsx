import Header from '../components/Header.jsx'
import UserHeader from '../components/UserHeader.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTokenStorage } from '../utils/tokenStorageFunctions.js'
import { setTokenAction, thunkGetUserProfile } from '../storeRedux/auth'

import '../main.css'

export default function Home() {
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
