import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useEffect } from 'react'
// import { setMessage } from './message'

import { serviceLogin, serviceGetUserName } from '../services/auth.service'

// const user = JSON.parse(localStorage.getItem('user'))

export const thunkLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await serviceLogin(email, password)
      console.log('auth/login data', data)
      // return { user: data }
      return { data }
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // thunkAPI.dispatch(setMessage(message))
      console.log('catch middleware login :', message)
      return rejectWithValue({ message })
    }
  }
)

export const thunkGetUserName = createAsyncThunk(
  'auth/getUserName',
  async (payloadUserProfile, { rejectWithValue }) => {
    try {
      console.log('auth/getUserName !!!!!!!!!')
      // const dataName = await serviceGetUserName(dataUserProfile)
      // firstName = data.firstName
      // lastName = data.lastName
      // console.log('auth/getUserName dataName', data.firstName, data.lastName)
      // return { firstName, lastName }
      // console.log('auth/getUserName dataName', dataName)
      // return dataName
      return await serviceGetUserName(payloadUserProfile)
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log('catch middleware userProfile :', message)
      return rejectWithValue({ message })
    }
  }
)

const initialState = {
  isLoginOk: false,
  // user: null,
  firstName: '',
  lastName: '',
  maVariable: 'coucou ma variable',
  // token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {
  //   setTokenAction: (state, action) => {
  //     state.token = action.payload
  //   },
  // },
  extraReducers: {
    [thunkLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      // state.user = action.payload.user
      // state.token = action.payload.token
      state.isLoginOk = true
      state.maVariable = 'Login Ok !'
    },
    [thunkLogin.rejected]: (state, action) => {
      state.isLoginOk = false
      // state.user = null
    },
    [thunkGetUserName.fulfilled]: (state, action) => {
      state.maVariable = 'Profile OK !'
      // state.isLoginOk = true
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false
    //   state.user = null
    // },
  },
})

// export const { setTokenAction } = authSlice.actions
const { reducer } = authSlice
export default reducer
