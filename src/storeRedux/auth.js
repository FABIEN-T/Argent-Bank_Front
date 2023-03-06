import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useEffect } from 'react'
// import { setMessage } from './message'

import { serviceLogin, serviceGetUserName } from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))

export const thunkLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await serviceLogin(email, password)
      console.log('auth/login data', data)
      return { user: data }
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
  'auth/userProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().token
      const { dataName } = await serviceGetUserName(profileData, token)
      console.log('auth/userProfile dataName', profileData)
      return { dataName }
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // thunkAPI.dispatch(setMessage(message))
      console.log('catch middleware userProfile :', message)
      return rejectWithValue({ message })
    }
  }
)

const initialState = {
  isLoginOk: false,
  user: null,
  firstName: '',
  lastName: '',
  maVariable: 'coucou ma variable',
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    // [register.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false
    // },
    // [register.rejected]: (state, action) => {
    //   state.isLoggedIn = false
    // },
    [thunkLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoginOk = true
      state.maVariable = 'tout change !'
    },
    [thunkLogin.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
    [thunkGetUserName.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    // [logout.fulfilled]: (state, action) => {
    //   state.isLoggedIn = false
    //   state.user = null
    // },
  },
})

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(register.fulfilled, (state, action) => {
//       state.isLoggedIn = false;
//     })
//       .addCase(register.rejected, (state, action) => {
//       state.isLoggedIn = false;
//     })
//     .addCase(login.fulfilled, (state, action) => {
//       state.isLoggedIn = true;
//       state.user = action.payload.user;
//     })
//     .addCase(login.rejected, (state, action) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     })
//     .addCase(logout.fulfille, (state, action) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     })
//   },
// });

const { reducer } = authSlice
export default reducer
