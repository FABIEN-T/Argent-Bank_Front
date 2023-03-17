import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTokenStorage,
  removeTokenStorage,
  isGetTokenStorage,
} from '../utils/tokenStorageFunctions'

import {
  serviceLogin,
  serviceGetUserProfile,
  serviceUpdateUserProfile,
} from '../services/auth.service'
import {
  loadStateLocalStorage,
  loadStateSessionStorage,
} from '../utils/stateStorageFunctions'

export const thunkLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const isRememberMe = getState().auth.isRememberMe
      const data = await serviceLogin(email, password, isRememberMe)
      // console.log('auth/login data', data)
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
  async (payloadUserProfile, { getState, rejectWithValue }) => {
    try {
      // console.log('auth/getUserName !!!!!!!!!')
      const isRememberMe = getState().auth.isRememberMe
      // console.log('auth/getUserProfile isRememberMe', isRememberMe)
      return await serviceGetUserProfile(payloadUserProfile, isRememberMe)
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
  async (payloadUpdateData, { getState, rejectWithValue }) => {
    try {
      // console.log('1', updateData)
      // const token = thunkApi.getState().auth.token
      const isRememberMe = getState().auth.isRememberMe
      // console.log('auth/updateUserProfile', isRememberMe)
      return await serviceUpdateUserProfile(payloadUpdateData, isRememberMe)
    } catch (error) {
      console.log('Catch Error', error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log('catch middleware updateUserProfile :', message)
      return rejectWithValue({ message })
    }
  }
)

const initialStateMemory = {
  firstName: '',
  lastName: '',
  isLogin: false,
  isRememberMe: false,
  isToken: false,
  isEdit: false,
}
// const persistedState = {loadState()}
// const initialState = persistedState
//   ? persistedState.state.auth
//   : initialStateMemory

const persistedState = loadStateLocalStorage()
  ? loadStateLocalStorage()
  : loadStateSessionStorage()

const initialState = persistedState
  ? persistedState.state.auth
  : initialStateMemory

const authSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    actionLogout: (state) => {
      removeTokenStorage(state.isRememberMe)
      state.firstName = ''
      state.lastName = ''
      state.isLogin = false
      state.isRememberMe = false
      state.isToken = false
      state.isEdit = false
    },
    actionIsEdit: (state) => {
      state.isEdit = !state.isEdit
    },
    actionIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
      console.log('ACTIONisRememberMe', state.isRememberMe)
      // if (state.isRememberMe === false) {
      //   localStorage.removeItem('state')
      // }
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state, action) => {
      state.isToken = isGetTokenStorage()
      state.isLogin = false
    },
    [thunkLogin.rejected]: (state, action) => {
      // state.isLogin = true
      // state.isToken = false
    },
    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isLogin = false
      console.log('getUser isGetTokenStorage()', isGetTokenStorage())
      state.isToken = isGetTokenStorage()
      // state.isToken = true
    },
    [thunkGetUserProfile.rejected]: (state) => {
      // state.isToken = false
    },
    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    [thunkUpdateUserProfile.rejected]: (state) => {
      state.isEdit = false
    },
  },
})

export const { actionIsRememberMe, actionIsEdit, actionLogout } =
  authSlice.actions
export default authSlice.reducer
