import { createSlice } from '@reduxjs/toolkit'
import {
  removeTokenStorage,
  isGetTokenStorage,
} from '../utils/tokenStorageFunctions'
import { removeState } from '../utils/stateStorageFunctions'

import {
  thunkLogin,
  thunkGetUserProfile,
  thunkUpdateUserProfile,
} from './thunks'

import {
  loadStateLocalStorage,
  loadStateSessionStorage,
} from '../utils/stateStorageFunctions'

const initialStateMemory = {
  firstName: '',
  lastName: '',
  isLoading: false,
  isRememberMe: false,
  isToken: false,
  isEdit: false,
  errorMessage: null,
}

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
      removeState(state.isRememberMe)
      state.firstName = ''
      state.lastName = ''
      state.isLoading = false
      state.isRememberMe = false
      state.isToken = false
      state.isEdit = false
    },
    actionIsEdit: (state) => {
      state.isEdit = !state.isEdit
    },
    actionIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
    },
    actionHome: (state) => {
      state.errorMessage = null
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state) => {
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [thunkLogin.pending]: (state) => {
      state.isLoading = true
    },
    [thunkLogin.rejected]: (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    },
    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isLoading = false
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [thunkGetUserProfile.rejected]: (state, action) => {
      state.errorMessage = action.payload.message
    },
    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.errorMessage = null
    },
    [thunkUpdateUserProfile.rejected]: (state, action) => {
      state.isEdit = false
      state.errorMessage = action.payload.message
    },
  },
})

export const { actionIsRememberMe, actionIsEdit, actionLogout, actionHome } =
  authSlice.actions
export default authSlice.reducer
