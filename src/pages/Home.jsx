import { useDispatch } from 'react-redux'
import { actionInitErrorMessage } from '../_features/auth.slice.js'
import { useEffect } from 'react'

import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import FeaturesBank from '../components/FeaturesBank.jsx'
import Footer from '../components/Footer.jsx'

import '../main.css'

export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    // appel de l'action de réinitialisation du message d'erreur
    dispatch(actionInitErrorMessage())
  })

  return (
    <>
      <Header />
      <main>
        <Banner />
        <FeaturesBank />
      </main>
      <Footer />
    </>
  )
}
