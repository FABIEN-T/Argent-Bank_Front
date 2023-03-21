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
  // const initialStateMemory = {
  firstName: '',
  lastName: '',
  isLoading: false,
  // isBtnSignIn: true,
  isRememberMe: false,
  isToken: false,
  isEdit: false,
  errorMessage: null,
}

const persistedState = loadStateLocalStorage()
  ? loadStateLocalStorage()
  : loadStateSessionStorage()

// const persistedState = () => {
//   if (loadStateLocalStorage()) {
//     console.log('loadStateLocalStorage *****')
//     loadStateLocalStorage()
//   }
//   if (loadStateSessionStorage()) {
//     console.log('loadStateSessionStorage #######')
//     loadStateSessionStorage()
//   } else return null
// }

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
      // state.isBtnSignIn = true
      // state.isLogin = false
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
    actionHome: (state) => {
      state.errorMessage = null
      // state.isBtnSignIn = true
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state, action) => {
      state.isToken = isGetTokenStorage()
      // loadStateLocalStorage()
      //   ? loadStateLocalStorage()
      //   : loadStateSessionStorage()
      // state.isLogin = false
      state.errorMessage = null
    },
    [thunkLogin.pending]: (state, action) => {
      state.isLoading = true
    },
    [thunkLogin.rejected]: (state, action) => {
      // state.isLogin = true
      // state.isToken = false
      state.isLoading = false
      state.errorMessage = action.payload.message
      console.log('window.location', window.location)
    },
    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isLoading = false
      // state.isLogin = false
      // console.log('getUser isGetTokenStorage()', isGetTokenStorage())
      state.isToken = isGetTokenStorage()
      // state.isToken = true
      state.errorMessage = null
      // state.isBtnSignIn = false
    },
    [thunkGetUserProfile.rejected]: (state, action) => {
      // state.isToken = false
      console.log('Error 500 GET')
      state.errorMessage = action.payload.message
    },
    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.errorMessage = null
    },
    [thunkUpdateUserProfile.rejected]: (state, action) => {
      console.log('Error 500 UP')
      state.isEdit = false
      state.errorMessage = action.payload.message
    },
  },
})

export const { actionIsRememberMe, actionIsEdit, actionLogout, actionHome } =
  authSlice.actions
export default authSlice.reducer

// export const thunkLogin = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { getState, rejectWithValue }) => {
//     try {
//       const isRememberMe = getState().auth.isRememberMe
//       const data = await serviceLogin(email, password, isRememberMe)
//       // console.log('auth/login data', data)
//       return { data }
//     } catch (error) {
//       console.log('Catch Error', error)
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       // thunkAPI.dispatch(setMessage(message))
//       console.log('catch middleware login :', message)
//       return rejectWithValue({ message })
//     }
//   }
// )

// export const thunkGetUserProfile = createAsyncThunk(
//   'auth/getUserProfile',
//   async (payloadUserProfile, { getState, rejectWithValue }) => {
//     try {
//       // console.log('auth/getUserName !!!!!!!!!')
//       const isRememberMe = getState().auth.isRememberMe
//       // console.log('auth/getUserProfile isRememberMe', isRememberMe)
//       return await serviceGetUserProfile(payloadUserProfile, isRememberMe)
//     } catch (error) {
//       console.log('Catch Error', error)
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       console.log('catch middleware getUserProfile :', message)
//       return rejectWithValue({ message })
//     }
//   }
// )

// export const thunkUpdateUserProfile = createAsyncThunk(
//   'auth/updateUserProfile',
//   async (payloadUpdateData, { getState, rejectWithValue }) => {
//     try {
//       // console.log('1', updateData)
//       // const token = thunkApi.getState().auth.token
//       const isRememberMe = getState().auth.isRememberMe
//       // console.log('auth/updateUserProfile', isRememberMe)
//       return await serviceUpdateUserProfile(payloadUpdateData, isRememberMe)
//     } catch (error) {
//       console.log('Catch Error', error)
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       console.log('catch middleware updateUserProfile :', message)
//       return rejectWithValue({ message })
//     }
//   }
// )

// const persistedState = {loadState()}
// const initialState = persistedState
//   ? persistedState.state.auth
//   : initialStateMemory

// import {
//   serviceLogin,
//   serviceGetUserProfile,
//   serviceUpdateUserProfile,
// } from '../services/auth.service'
