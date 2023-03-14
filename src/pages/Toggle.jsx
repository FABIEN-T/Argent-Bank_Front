import { useState } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'

import { actionIsEdit } from '../storeRedux/auth.js'
import {
  setTokenStorage,
  getTokenStorage,
} from '../utils/tokenStorageFunctions'

export default function Toggle() {
  const dispatch = useDispatch()
  const myStore = useStore()
  console.log('Toggle STATE', myStore.getState().auth.isEdit)
  const isEdit = useSelector((state) => state.auth.isEdit)
  let etat = false
  let truc = null

  // console.log('isEdit', isEdit)
  const callDispatch = (e) => {
    e.preventDefault()
    // console.log('Toggle', JSON.parse(localStorage.getItem('token')))
    // truc = getTokenStorage(true)
    console.log('Toggle ftn', getTokenStorage(true))
    dispatch(actionIsEdit())
  }

  return (
    <div>
      <h1>
        Toggle
        <br />
      </h1>

      <button className="edit-button" onClick={callDispatch}>
        {/* <button className="edit-button" onClick={() => dispatch(actionIsEdit())}> */}
        Edit Name
      </button>
      <p>Etat de isEdit</p>
      <p>{etat}</p>
    </div>
  )
}
