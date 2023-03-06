import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useEffect } from 'react'
// import { setMessage } from './message'

import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(
        email,
        password,
        firstName,
        lastName
      )
      // thunkAPI.dispatch(setMessage(response.data.message))
      return response.data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // thunkAPI.dispatch(setMessage(message))
      return rejectWithValue({ message })
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const data = await AuthService.login(email, password)
      console.log('login data', data)
      console.log('login isLoginOk', getState().isLoginOk)
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
      console.log('login: catch de middleware', message)
      return rejectWithValue({ message })
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout()
})
// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null }

const initialState = {
  isLoginOk: false,
  user: null,
  maVariable: 'coucou ma variable',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.isLoginOk = true
      state.maVariable = action.payload.user
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
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
