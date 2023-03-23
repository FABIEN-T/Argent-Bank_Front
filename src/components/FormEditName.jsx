import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { actionIsEdit } from '../storeRedux/auth'
import { thunkUpdateUserProfile } from '../storeRedux/thunks'
import { removeState } from '../utils/stateStorageFunctions'

export default function Upname() {
  const dispatch = useDispatch()
  const { firstName, lastName, isRememberMe } = useSelector(
    (state) => state.auth
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const save = (data) => {
    const updateData = {
      firstName: data.firstName ? data.firstName : firstName,
      lastName: data.lastName ? data.lastName : lastName,
    }
    dispatch(actionIsEdit())
    dispatch(thunkUpdateUserProfile(updateData, isRememberMe))
    removeState(isRememberMe)
  }

  return (
    <form>
      <div className="inputName-wrapper inputName-wrapper-column">
        <div className="inputContainer">
          <div className="inputNameError">
            {errors?.firstName?.type === 'required' && (
              <p className="pErrorName">This field is required</p>
            )}
            {errors?.firstName?.type === 'maxLength' && (
              <p className="pErrorName">Cannot exceed 20 characters</p>
            )}
            {errors?.firstName?.type === 'pattern' && (
              <p className="pErrorName">Alphabetical characters only</p>
            )}
          </div>
          <input
            name="firstName"
            placeholder="saisissez votre prénom"
            {...register('firstName', {
              required: true,
              maxLength: 20,
              pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
            })}
          />
        </div>
        <div className="gapInput"></div>
        <div className="inputContainer">
          <div className="inputNameError">
            {errors?.lastName?.type === 'required' && (
              <p className="pErrorName pLastName">This field is required</p>
            )}
            {errors?.lastName?.type === 'maxLength' && (
              <p className="pErrorName pLastName">
                Cannot exceed 20 characters
              </p>
            )}
            {errors?.lastName?.type === 'pattern' && (
              <p className="pErrorName pLastName">
                Alphabetical characters only
              </p>
            )}
          </div>
          <input
            name="lastName"
            placeholder="saisissez votre nom"
            {...register('lastName', {
              required: true,
              maxLength: 20,
              pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
            })}
          />
        </div>
      </div>
      <div className="inputName-wrapper">
        <button className="edit-button" onClick={handleSubmit(save)}>
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
    </form>
  )
}
