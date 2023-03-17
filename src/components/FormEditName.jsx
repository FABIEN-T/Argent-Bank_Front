import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { thunkUpdateUserProfile, actionIsEdit } from '../storeRedux/auth'
import { removeState } from '../utils/stateStorageFunctions'

import '../main.css'

export default function FormEditName() {
  const dispatch = useDispatch()
  // const [setLoading] = useState(false)

  const { firstName, lastName, isRememberMe } = useSelector(
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
    dispatch(actionIsEdit())
    // console.log('FormEditName', updateData)
    dispatch(thunkUpdateUserProfile(updateData, isRememberMe))
    removeState(isRememberMe)
  }

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
    </>
  )
}
