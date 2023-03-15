import { useSelector, useDispatch, useStore } from 'react-redux'

import FormEditName from './FormEditName.jsx'
import { actionIsEdit, thunkUpdateUserProfile } from '../storeRedux/auth.js'

export default function UserWelcome() {
  const dispatch = useDispatch()

  const { isEdit, firstName, lastName } = useSelector((state) => state.auth)

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
        <button
          className="edit-button"
          onClick={() => dispatch(actionIsEdit())}
        >
          Edit Name
        </button>
      )}
    </div>
  )
}
