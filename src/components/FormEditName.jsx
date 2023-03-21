import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { actionIsEdit } from '../storeRedux/auth'
import { thunkUpdateUserProfile } from '../storeRedux/thunks'
import { removeState } from '../utils/stateStorageFunctions'

import '../main.css'
import RegisterForm from './ess'
import UpName from './ess2'

export default function FormEditName() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { firstName, lastName, isRememberMe, errorMessage } = useSelector(
    (state) => state.auth
  )
  const [upFirstName, setUpFirstName] = useState('')
  const [upLastName, setUpLastName] = useState('')
  // const [isInputError, setInputError] = useState('')

  const handleUpdate = (e) => {
    // e.preventDefault()
    const updateData = {
      firstName: upFirstName ? upFirstName : firstName,
      lastName: upLastName ? upLastName : lastName,
    }
    dispatch(actionIsEdit())
    dispatch(thunkUpdateUserProfile(updateData, isRememberMe))
    removeState(isRememberMe)
  }

  useEffect(() => {
    errorMessage === 'Network Error' && navigate('/errorAPI')
    console.log('errorMessage', errorMessage)
  })

  // function Ess() {
  //   const [inputValue, setInputValue] = useState('Posez votre question ici')
  //   return (
  //     <div>
  //       <textarea
  //         value={inputValue}
  //         onChange={(e) => setInputValue(e.target.value)}
  //       />
  //     </div>
  //   )
  // }

  return (
    <>
      {/* <form>
        <div className="inputName-wrapper">
          <input
            type="text"
            value={upFirstName}
            placeholder={'saisissez votre prénom'}
            onChange={(event) => {
              setUpFirstName(event.target.value)
            }}
          />

          <div className="gapInput"></div>
          <input
            type="text"
            value={upLastName}
            placeholder={'saisissez votre nom'}
            onChange={(event) => {
              setUpLastName(event.target.value)
            }}
          />
        </div>
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
      </form> */}

      <UpName />
    </>
  )
}
