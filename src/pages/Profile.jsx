import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Header from '../components/Header.jsx'
import UserWelcome from '../components/UserWelcome.jsx'
import UserTransaction from '../components/UserTransaction.jsx'
import Footer from '../components/Footer.jsx'

import { thunkGetUserProfile } from '../storeRedux/thunks'

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
  // const myStore = useStore()
  const dispatch = useDispatch()

  const { errorMessage } = useSelector((state) => state.auth)
  // const { errorMessage } = useSelector((state) => state.auth)
  useEffect(() => {
    // console.log('UserWelcome errorMessage', errorMessage)
    dispatch(thunkGetUserProfile())
  }, [dispatch])
  // console.log('PROFILE isLogin', isLogin)

  // console.log('PROFILE STATE', myStore.getState().auth)

  return (
    <>
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
    </>
  )
}
