import { useNavigate, redirect } from 'react-router-dom'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { thunkUpdateUserProfile } from '../storeRedux/auth'
import { useEffect, useState } from 'react'

export default function FormEditName() {
  const myStore = useStore()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { isToken, token } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/login')
  //   } else {
  //     dispatch(thunkUpdateUserProfile())
  //   }
  // }, [dispatch, isToken, navigate])

  //   console.log('FormEditName STATE', myStore.getState().auth)
  // const { firstName, lastName } = useSelector((state) => state.auth)
  const [upFirstName, setUpFirstName] = useState('')
  const [upLastName, setUpLastName] = useState('')

  const handleUpdate = () => {
    // const { upFirstName, upLastName } = formValue
    const updateData = {
      firstName: upFirstName,
      lastName: upLastName,
    }
    // console.log('FormEditName', upFirstName, upLastName)
    // console.log('FormEditName', updateData)
    setLoading(true)

    dispatch(thunkUpdateUserProfile(updateData))
    //   .unwrap()
    //   //   .then(() => {
    //   //     navigate('/profile')
    //   //   })
    //   .catch(() => {
    //     setLoading(false)
    //   })
  }

  return (
    <>
      <form>
        {/* <label htmlFor="name-field">Name:</label> */}
        <input
          //   id="name-field"
          value={upFirstName}
          onChange={(event) => {
            setUpFirstName(event.target.value)
          }}
        />
        {/* <label htmlFor="name-field">Name:</label> */}
        <input
          //   id="name-field"
          value={upLastName}
          onChange={(event) => {
            setUpLastName(event.target.value)
          }}
        />
      </form>

      <p>{upFirstName + ' ' + upLastName} </p>

      <button className="edit-button" onClick={handleUpdate}>
        Save
      </button>
      <button className="edit-button">Cancel</button>
    </>
  )
}
