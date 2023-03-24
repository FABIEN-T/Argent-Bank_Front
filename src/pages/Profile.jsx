import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Header from '../components/Header.jsx'
import UserWelcome from '../components/UserWelcome.jsx'
import UserTransaction from '../components/UserTransaction.jsx'
import Footer from '../components/Footer.jsx'

import { mwGetUserProfile } from '../_middlewares/middlewares'

export default function Profile() {
  const datasAccount = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance',
    },
  ]

  const dispatch = useDispatch()

  useEffect(() => {
    // appel de la fonction de récupération du prénom et du nom de l'Utilisateur dans la base de données
    dispatch(mwGetUserProfile())
  }, [dispatch])

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
