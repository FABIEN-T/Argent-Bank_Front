import { useSelector, useDispatch } from 'react-redux'

import { thunkUpdateUserProfile, actionIsEdit } from '../storeRedux/auth'
import { useEffect, useState } from 'react'

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
  }

  return (
    <>
      <form>
        <div class="inputName-wrapper">
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
      <div class="inputName-wrapper">
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
