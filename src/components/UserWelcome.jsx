import { Link } from 'react-router-dom'

import { useState } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'

import FormEditName from './FormEditName.jsx'
import { actionIsEdit, thunkUpdateUserProfile } from '../storeRedux/auth.js'

export default function UserWelcome() {
  const dispatch = useDispatch()
  const myStore = useStore()
  console.log('UserWelcome STATE', myStore.getState().auth)
  const { isEdit, firstName, lastName, isToken } = useSelector(
    (state) => state.auth
  )

  const [isOpen, setIsOpen] = useState(false)

  const [upFirstName, setUpFirstName] = useState('')
  const [upLastName, setUpLastName] = useState('')

  // const handleUpdate = (e) => {
  //   e.preventDefault()
  //   const updateData = {
  //     firstName: upFirstName ? upFirstName : firstName,
  //     lastName: upLastName ? upLastName : lastName,
  //   }
  //   // console.log('FormEditName', updateData)
  //   setIsOpen(false)
  //   dispatch(thunkUpdateUserProfile(updateData))
  // }

  // console.log('isEdit', isEdit)

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
        // console.log('isEdit', isEdit)
        <button
          className="edit-button"
          onClick={() => dispatch(actionIsEdit())}
        >
          Edit Name
        </button>
      )}
      {/* <FormEditName /> */}
    </div>
  )
}
// myFunction = (e) => {
//   e.preventDefault()
//   dispatch(actionIsEdit())
// }

//   return (
//     <div className="header">
//       <h1>
//         Welcome back
//         <br />
//         {firstName} {lastName}!
//       </h1>
//       {isOpen ? (
//         <>
//           <form>
//             <input
//               value={upFirstName}
//               onChange={(event) => {
//                 setUpFirstName(event.target.value)
//               }}
//             />
//             <input
//               value={upLastName}
//               onChange={(event) => {
//                 setUpLastName(event.target.value)
//               }}
//             />
//           </form>
//           {/* <p>{upFirstName + ' ' + upLastName} </p> */}
//           <button className="edit-button" onClick={handleUpdate}>
//             Save
//           </button>
//           <button className="edit-button" onClick={() => setIsOpen(false)}>
//             Cancel
//           </button>
//         </>
//       ) : (
//         <button className="edit-button" onClick={() => setIsOpen(true)}>
//           Edit Name
//         </button>
//       )}
//       {/* <FormEditName /> */}
//     </div>
//   )
// }
