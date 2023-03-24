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
      // retourne l'email et le mot de passe au backend pour authentification
      return await serviceLogin(email, password, isRememberMe)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // retourne le emssage d'erreur récupéré
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
      // retourne le prénom et le nom de l'utilisateur dans la page profile
      return await serviceGetUserProfile(payloadUserProfile, isRememberMe)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // retourne le emssage d'erreur récupéré
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
      // retourne le prénom et le nom modifiés de l'utilisateur dans la page profile et dans la base de données
      return await serviceUpdateUserProfile(payloadUpdateData, isRememberMe)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      // retourne le message d'erreur récupéré
      return rejectWithValue({ message })
    }
  }
)
