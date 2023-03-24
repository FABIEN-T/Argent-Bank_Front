import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceLogin,
  serviceGetUserProfile,
  serviceUpdateUserProfile,
} from '../_services/auth.service'

// Page Login : Authentification de l'Utilisateur
export const mwLogin = createAsyncThunk(
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

// Page Profile : Récupération  du prénom et du nom depuis la base de données
export const mwGetUserProfile = createAsyncThunk(
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

// Page Profile : Mise à jour du prénom et du nom dans la base de données
export const mwUpdateUserProfile = createAsyncThunk(
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