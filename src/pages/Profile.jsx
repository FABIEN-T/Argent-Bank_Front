import UserHeader from '../components/UserHeader.jsx'
import UserWelcome from '../components/UserWelcome.jsx'
import UserTransaction from '../components/UserTransaction.jsx'
import Footer from '../components/Footer.jsx'
// import LogoArgentBank from '../img/argentBankLogo.png'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { thunkGetUserName } from '../storeRedux/auth'
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
  // const dispatch = useDispatch()
  // const navigate = useNavigate
  // const { isLoginOk } = useSelector((state) => state.auth)
  // console.log('Profile isLoginOk', isLoginOk)
  // dispatch(thunkGetUserName())
  // const { firstName, lastName } = useSelector((state) => state.auth)
  // console.log('Profile Name', isLoginOk, firstName, lastName)
  // const firstName = "Tony"
  const myStore = useStore()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkGetUserName())
    console.log('PROFILE STATE', myStore.getState().auth)
  }, [dispatch, myStore])
  const { firstName, lastName } = useSelector((state) => state.auth)
  console.log('Profile all Name', firstName, lastName)

  return (
    <div className="container">
      <UserHeader />
      <main className="main bg-dark">
        <UserWelcome firstName={firstName} lastName={lastName} />
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
