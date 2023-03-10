import { useSelector, useDispatch } from 'react-redux'

import { thunkUpdateUserProfile, actionIsEdit } from '../storeRedux/auth'
import { useEffect, useState } from 'react'

export default function FormEditName() {
  const dispatch = useDispatch()
  // const [setLoading] = useState(false)

  const { firstName, lastName } = useSelector((state) => state.auth)

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
    dispatch(thunkUpdateUserProfile(updateData))
  }

  return (
    <>
      <form>
        <input
          value={upFirstName}
          onChange={(event) => {
            setUpFirstName(event.target.value)
          }}
        />
        <input
          value={upLastName}
          onChange={(event) => {
            setUpLastName(event.target.value)
          }}
        />
      </form>
      {/* <p>{upFirstName + ' ' + upLastName} </p> */}
      <button className="edit-button" onClick={handleUpdate}>
        Save
      </button>
      <button className="edit-button" onClick={() => dispatch(actionIsEdit())}>
        Cancel
      </button>
    </>
  )
}
