import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { removeTokenStorage } from '../utils/tokenStorageFunctions'

import {
  serviceLogin,
  serviceGetUserProfile,
  serviceUpdateUserProfile,
  // serviceLogout,
} from '../services/auth.service'

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

export const thunkGetUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (payloadUserProfile, { rejectWithValue }) => {
    try {
      // console.log('auth/getUserName !!!!!!!!!')
      return await serviceGetUserProfile(payloadUserProfile)
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log('catch middleware getUserProfile :', message)
      return rejectWithValue({ message })
    }
  }
)

export const thunkUpdateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updateData, thunkApi) => {
    try {
      // console.log('1', updateData)
      const token = thunkApi.getState().auth.token
      // console.log('auth/updateUserProfile !!!!!!!!!', token)
      return await serviceUpdateUserProfile(updateData, token)
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log('catch middleware updateUserProfile :', message)
      return thunkApi.rejectWithValue({ message })
    }
  }
)

const initialState = {
  isLoginOk: false,
  firstName: '',
  lastName: '',
  isToken: false,
  token: localStorage.getItem('token') || null,
  maVariable: 'coucou ma variable',
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    actionLogout: (state, action) => {
      sessionStorage.removeItem('token')
      console.log('!!!! LOGOUT !!!!')
      localStorage.clear()
      state.token = null
      state.isLoginOk = false
      state.firstName = ''
      state.lastName = ''
      state.isToken = false
      state.maVariable = 'LOGOUT !'
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state, action) => {
      state.isLoginOk = true
      state.isToken = true
      state.token = JSON.parse(localStorage.getItem('token'))
      state.maVariable = 'Login Ok !'
    },
    [thunkLogin.rejected]: (state, action) => {
      state.isLoginOk = false
      // state.user = null
    },
    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isToken = true
      state.maVariable = 'Profile OK !'
      // localStorage.removeItem('token')
    },
    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      state.token = action.payload.token
      localStorage.setItem('token', state.token)
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isToken = true
      state.maVariable = 'Edit OK !'
      // localStorage.removeItem('token')
    },
  },
})

export const { actionLogout } = authSlice.actions
const { reducer } = authSlice
export default reducer
