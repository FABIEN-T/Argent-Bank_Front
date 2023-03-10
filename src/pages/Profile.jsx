// import UserHeader from '../components/UserHeader.jsx'
import Header from '../components/Header.jsx'
import UserWelcome from '../components/UserWelcome.jsx'
import UserTransaction from '../components/UserTransaction.jsx'
import Footer from '../components/Footer.jsx'

import { useNavigate, redirect } from 'react-router-dom'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { thunkGetUserProfile } from '../storeRedux/auth'
import { useEffect } from 'react'

export default function Profile() {
  const datasAccount = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance',
      transactionBtn: 'View transactions',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance',
      transactionBtn: 'View transactions',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance',
      transactionBtn: 'View transactions',
    },
  ]
  const myStore = useStore()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isToken, token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!isToken) {
      navigate('/login')
    } else {
      dispatch(thunkGetUserProfile())
    }
  }, [dispatch, isToken, navigate])

  console.log('PROFILE STATE', myStore.getState().auth)
  const { firstName, lastName } = useSelector((state) => state.auth)
  // console.log('Profile all Name', firstName, lastName)

  return (
    <div className="container">
      <Header />
      <main className="main bg-dark">
        <UserWelcome />
        <h2 className="sr-only">Accounts</h2>
        {datasAccount.map((object) => (
          <UserTransaction
            key={object.title}
            title={object.title}
            amount={object.amount}
            description={object.description}
            transactionBtn={object.transactionBtn}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}
