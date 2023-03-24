import { useSelector, useDispatch } from 'react-redux'

import FormEditName from './FormEditName.jsx'
import { actionToggleEdit } from '../_features/auth.slice.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserWelcome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toggleEdit, firstName, lastName, errorMessage } = useSelector(
    (state) => state.auth
  ) // récupération des élements du state

  useEffect(() => {
    errorMessage === 'Network Error' && navigate('/errorAPI')
  })

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      {toggleEdit ? (
        <FormEditName />
      ) : (
        <>
          <button
            className="edit-button"
            onClick={() => {
              // appel de l'action "toggle" d'ouverture/fermeture du formulaire d'édition (prénom, nom)
              dispatch(actionToggleEdit())
            }}
          >
            Edit Name
          </button>
        </>
      )}
    </div>
  )
}
