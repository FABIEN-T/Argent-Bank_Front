import Header from '../components/Header.jsx'
import Banner from '../components/Banner.jsx'
import Features from '../components/Features.jsx'
import Footer from '../components/Footer.jsx'

import { useSelector, useDispatch, useStore } from 'react-redux'
import { actionHome } from '../storeRedux/auth'
import '../main.css'
import { useEffect } from 'react'
import { removeState } from '../utils/stateStorageFunctions.js'

export default function Home() {
  const myStore = useStore()
  console.log('HOME STATE', myStore.getState().auth)
  let isBtnSignIn = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionHome())
  })
  // useEffect(() => {
  // isBtnSignIn === true && sessionStorage.removeItem('state')
  // })

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
