import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

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
