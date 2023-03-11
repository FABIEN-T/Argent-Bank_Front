import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getTokenStorage,
  removeTokenStorage,
} from '../utils/tokenStorageFunctions'

import {
  serviceLogin,
  serviceGetUserProfile,
  serviceUpdateUserProfile,
  // serviceLogout,
} from '../services/auth.service'

// const user = JSON.parse(localStorage.getItem('user'))

export const thunkLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { getState, rejectWithValue }) => {
    try {
      const isRememberMe = getState().auth.isRememberMe
      const data = await serviceLogin(email, password, isRememberMe)
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
  async ({ payloadUserProfile }, { getState, rejectWithValue }) => {
    try {
      // console.log('auth/getUserName !!!!!!!!!')
      const isRememberMe = getState().auth.isRememberMe
      console.log('auth/getUserProfile isRememberMe', isRememberMe)
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
  async ({ payloadUpdateData }, { getState, thunkApi }) => {
    try {
      // console.log('1', updateData)
      // const token = thunkApi.getState().auth.token
      const isRememberMe = getState().auth.isRememberMe
      console.log('auth/updateUserProfile', isRememberMe)
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
      return thunkApi.rejectWithValue({ message })
    }
  }
)

// const typeStorage = false

const initialState = {
  // isLoginOk: false,
  firstName: '',
  lastName: '',
  isToken: false,
  isEdit: false,
  isRememberMe: false,
  // token: JSON.parse(getTokenStorage(isRememberMe)) || null,
  token: null,
}

const authSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    actionLogout: (state) => {
      // localStorage.removeItem('token')
      removeTokenStorage(state.isRememberMe)
      state.token = null
      // state.isLoginOk = false
      state.firstName = ''
      state.lastName = ''
      state.isToken = false
    },
    actionIsEdit: (state) => {
      // state.isEdit = true
      state.isEdit = !state.isEdit
    },
    actionIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
      console.log('auth', state.isRememberMe)
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state, action) => {
      // state.isLoginOk = true
      state.isToken = true
      // state.token = JSON.parse(getTokenStorage(state.isRememberMe))
    },
    [thunkLogin.rejected]: (state, action) => {
      // state.isLoginOk = false
      // state.user = null
    },
    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isToken = true
      // localStorage.removeItem('token')
    },
    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      // localStorage.setItem('token', state.token)
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isToken = true
    },
  },
})

export const { actionIsRememberMe, actionIsEdit, actionLogout } =
  authSlice.actions
export default authSlice.reducer

// export const { actionLogout } = authSlice.actions
// const { reducer } = authSlice
// export default reducer

// export const { actions, reducer } = authSlice
// export const { actionLogout } = actions
// export default reducer

// on extrait les actions et le reducer
// const { actions, reducer } = themeSlice
// // on export chaque action individuellement
// export const { set, toggle } = actions
// // on export le reducer comme default export
// export default reducer
