import { useSelector, useDispatch } from 'react-redux'

import FormEditName from './FormEditName.jsx'
import { actionIsEdit } from '../storeRedux/auth.js'
import { useEffect } from 'react'

export default function UserWelcome() {
  const dispatch = useDispatch()
  const { isEdit, firstName, lastName, errorMessage } = useSelector(
    (state) => state.auth
  )
  // const condition = errorMessage === 'Network Error' && isOnLine === false
  // useEffect(() => {
  //   console.log('UserWelcome errorMessage', errorMessage)

  //   // if (navigator.onLine) {
  //   //   console.log('Browser is online')
  //   // } else {
  //   //   console.log('Browser is offline')
  //   // }
  // })

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      {isEdit ? (
        <FormEditName />
      ) : (
        <>
          <button
            className="edit-button"
            onClick={() => dispatch(actionIsEdit())}
          >
            Edit Name
          </button>
          {/* {errorMessage === 'Network Error' && (
            <h3 className="impossible-edit">
              Edition impossible : Serveur non disponible, veuillez réessayer
              plus tard !
            </h3>
          )} */}
          {/* {errorMessage.message ? (
            <h3 className="impossible-edit">
                Edition impossible : Serveur non disponible, veuillez réessayer plus tard !
                Pour sortir, cliquer sur Cancel
              </h3>) : (
            ) */}
          {/* } */}
        </>
      )}
    </div>
  )
}
