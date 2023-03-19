import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceLogin,
  serviceGetUserProfile,
  serviceUpdateUserProfile,
} from '../services/auth.service'

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
      console.log('catch middleware LOGIN : ', message)
      return rejectWithValue({ message })
    }
  }
)

export const thunkGetUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (payloadUserProfile, { getState, rejectWithValue }) => {
    try {
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
