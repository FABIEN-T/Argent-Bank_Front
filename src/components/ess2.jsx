import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { actionIsEdit } from '../storeRedux/auth'
import { thunkUpdateUserProfile } from '../storeRedux/thunks'
import { removeState } from '../utils/stateStorageFunctions'

export default function Upname() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { firstName, lastName, isRememberMe, errorMessage } = useSelector(
    (state) => state.auth
  )
  const [upFirstName, setUpFirstName] = useState('')
  const [upLastName, setUpLastName] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const save = (data) => {
    console.log('save', data)
    // alert(JSON.stringify(data))
    const updateData = {
      firstName: data.firstName ? data.firstName : firstName,
      lastName: data.lastName ? data.lastName : lastName,
    }
    dispatch(actionIsEdit())
    dispatch(thunkUpdateUserProfile(updateData, isRememberMe))
    removeState(isRememberMe)
  }

  console.log(watch('example')) // you can watch individual input by pass the name of the input

  return (
    <form>
      <div className="inputName-wrapper">
        <input
          {...register('firstName', {
            required: true,
            maxLength: 20,
            pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
          })}
        />
        <div className="gapInput"></div>
        <input
          {...register('lastName', {
            required: true,
            maxLength: 20,
            pattern: /^[a-zA-Z\s\-À-ÖØ-öø-ÿ']+$/g,
          })}
        />
      </div>
      <div className="inputName-wrapper">
        <div>
          {errors?.lastName?.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors?.lastName?.type === 'maxLength' && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.lastName?.type === 'pattern' && (
            <p>Alphabetical characters only</p>
          )}
        </div>
        <div className="gapInput"></div>
        <div>
          {errors?.firstName?.type === 'required' && (
            <p>This field is required</p>
          )}
          {errors?.firstName?.type === 'maxLength' && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type === 'pattern' && (
            <p>Alphabetical characters only</p>
          )}
        </div>
      </div>
      {/* <div className="buttons-message"> */}
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
      {/* </div> */}
      {/* <input type="submit" /> */}
    </form>
  )
}
