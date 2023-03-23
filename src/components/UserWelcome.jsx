import { useSelector, useDispatch } from 'react-redux'

import FormEditName from './FormEditName.jsx'
import { actionIsEdit } from '../storeRedux/auth.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserWelcome() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isEdit, firstName, lastName, errorMessage } = useSelector(
    (state) => state.auth
  )

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
      {isEdit ? (
        <FormEditName />
      ) : (
        <>
          <button
            className="edit-button"
            onClick={() => {
              dispatch(actionIsEdit())
            }}
          >
            Edit Name
          </button>
        </>
      )}
    </div>
  )
}
