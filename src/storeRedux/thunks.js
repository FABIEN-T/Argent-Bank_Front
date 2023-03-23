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
      return { data }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return rejectWithValue({ message })
    }
  }
)

export const thunkGetUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (payloadUserProfile, { getState, rejectWithValue }) => {
    try {
      const isRememberMe = getState().auth.isRememberMe
      return await serviceGetUserProfile(payloadUserProfile, isRememberMe)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return rejectWithValue({ message })
    }
  }
)

export const thunkUpdateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (payloadUpdateData, { getState, rejectWithValue }) => {
    try {
      const isRememberMe = getState().auth.isRememberMe
      return await serviceUpdateUserProfile(payloadUpdateData, isRememberMe)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return rejectWithValue({ message })
    }
  }
)
