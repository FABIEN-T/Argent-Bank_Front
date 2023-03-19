import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { actionIsEdit } from '../storeRedux/auth'
import { thunkUpdateUserProfile } from '../storeRedux/thunks'
import { removeState } from '../utils/stateStorageFunctions'

import '../main.css'

export default function FormEditName() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { firstName, lastName, isRememberMe, errorMessage } = useSelector(
    (state) => state.auth
  )
  const [upFirstName, setUpFirstName] = useState('')
  const [upLastName, setUpLastName] = useState('')

  const handleUpdate = (e) => {
    e.preventDefault()
    const updateData = {
      firstName: upFirstName ? upFirstName : firstName,
      lastName: upLastName ? upLastName : lastName,
    }

    const initialValues = {
      firstName: '',
      lastName: '',
    }

    const validationSchema = Yup.object().shape({
      firstName: Yup.string()
        .required('Username is required')
        .min(2, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
      lastName: Yup.string()
        .required('Username is required')
        .min(2, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    })

    // console.log('FormEditName', updateData)
    // errorMessage
    //   ? dispatch(actionIsEdit())
    // :
    dispatch(actionIsEdit())
    dispatch(thunkUpdateUserProfile(updateData, isRememberMe))
    removeState(isRememberMe)
  }

  useEffect(() => {
    errorMessage === 'Network Error' && navigate('/erreurAPI')
  })

  return (
    <>
      <form>
        <div className="inputName-wrapper">
          <input
            value={upFirstName}
            placeholder={firstName}
            onChange={(event) => {
              setUpFirstName(event.target.value)
            }}
          />
          <div className="gapInput"></div>
          <input
            value={upLastName}
            placeholder={lastName}
            onChange={(event) => {
              setUpLastName(event.target.value)
            }}
          />
        </div>
      </form>
      <div className="buttons-message">
        <div className="inputName-wrapper">
          <button className="edit-button" onClick={handleUpdate}>
            Save
          </button>
          <div className="gapInput"></div>
          <button
            className="edit-button"
            onClick={() => dispatch(actionIsEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}
