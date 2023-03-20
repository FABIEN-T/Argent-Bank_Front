import React from 'react'
import { useForm } from 'react-hook-form'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleRegistration = (data) => console.log(data)
  const handleError = (errors) => {
    console.log('useForm', errors)
  }

  const registerOptions = {
    firstname: {
      required: 'firstName is required',
      minLength: {
        value: 2,
        message: 'Password must have at least 2 characters',
      },
      maxLength: {
        value: 40,
        message: 'Password must have at max 8 characters',
      },
    },
    lastname: {
      required: 'firstName is required',
      minLength: {
        value: 2,
        message: 'Password must have at least 2 characters',
      },
      maxLength: {
        value: 40,
        message: 'Password must have at max 8 characters',
      },
    },
  }

  return (
    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <div>
        <input
          firstname="name"
          type="text"
          {...register('firstName', registerOptions.firstname)}
        />
        <small className="text-danger">
          {errors?.firstname && errors.firstname.message}
        </small>
      </div>
      <div>
        <input
          lastname="name"
          type="text"
          {...register('lastName', registerOptions.name)}
        />
        <small className="text-danger">
          {errors?.lastname && errors.lastname.message}
        </small>
      </div>
      <button>Submit</button>
    </form>
  )
}
export default RegisterForm
