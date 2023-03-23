import { createSlice } from '@reduxjs/toolkit'

//Token
import {
  removeTokenStorage,
  isGetTokenStorage,
} from '../utils/tokenStorageFunctions'
//State
import {
  loadStateLocalStorage,
  loadStateSessionStorage,
  removeState,
} from '../utils/stateStorageFunctions'
// Middlewares
import {
  thunkLogin,
  thunkGetUserProfile,
  thunkUpdateUserProfile,
} from './middleware'

const initialStateMemory = {
  firstName: '',
  lastName: '',
  isLoading: false,
  isRememberMe: false,
  isToken: false,
  isEdit: false,
  errorMessage: null,
}

// Si local storag non chargé alors charger session storage
const persistedState = loadStateLocalStorage()
  ? loadStateLocalStorage()
  : loadStateSessionStorage()

// Initialisation de inititialState (dépend de la présence ou non du storage)
const initialState = persistedState
  ? persistedState.state.auth
  : initialStateMemory

const authSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    // action appelée lors du clic sur Sign out
    actionLogout: (state) => {
      removeTokenStorage(state.isRememberMe)
      removeState()
      state.firstName = ''
      state.lastName = ''
      state.isLoading = false
      state.isRememberMe = false
      state.isToken = false
      state.isEdit = false
    },
    // action "toggle" d'ouverture/fermeture du formulaire d'édition
    actionIsEdit: (state) => {
      state.isEdit = !state.isEdit
    },
    // action "toggle" du checkbox "Remember me" de la modale Login (page Login)
    actionIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
    },
    // action permettant de réinitialiser le message d'erreur
    actionHome: (state) => {
      state.errorMessage = null
    },
  },

  extraReducers: {
    [thunkLogin.fulfilled]: (state) => {
      // Booleen isToken : token dans le storage du navigateur  ?
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [thunkLogin.pending]: (state) => {
      state.isLoading = true // début du chargement
    },
    [thunkLogin.rejected]: (state, action) => {
      state.isLoading = false // fin du chargement
      state.errorMessage = action.payload.message // récupération du message d'erreur
    },

    [thunkGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isLoading = false
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [thunkGetUserProfile.rejected]: (state, action) => {
      state.errorMessage = action.payload.message // récupération du message d'erreur
    },

    [thunkUpdateUserProfile.fulfilled]: (state, action) => {
      // Update prénom et nom
      state.firstName = action.payload.firstNamees
      state.lastName = action.payload.lastName
      state.errorMessage = null
    },
    [thunkUpdateUserProfile.rejected]: (state, action) => {
      state.isEdit = false // "toggle" d'ouverture/fermeture du formulaire d'édition
      state.errorMessage = action.payload.message
    },
  },
})

export const { actionIsRememberMe, actionIsEdit, actionLogout, actionHome } =
  authSlice.actions
export default authSlice.reducer
