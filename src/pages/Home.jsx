import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

import { useStore } from 'react-redux'
import '../main.css'

export default function Home() {
  const myStore = useStore()
  console.log('HOME STATE', myStore.getState().auth)
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
