import { useDispatch } from 'react-redux'
import { actionHome } from '../storeRedux/auth'
import { useEffect } from 'react'

import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

import '../main.css'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionHome())
  })

  return (
    <>
      <Header />
      <main>
        <Banner />
        <Features />
      </main>
      <Footer />
    </>
  )
}
