import { createSlice } from '@reduxjs/toolkit'

//Token
import {
  removeTokenStorage,
  isGetTokenStorage,
} from '../_utils/tokenStorageFunctions'
//State
import {
  loadStateLocalStorage,
  loadStateSessionStorage,
  removeState,
} from '../_utils/stateStorageFunctions'
// Middlewares
import {
  mwLogin,
  mwGetUserProfile,
  mwUpdateUserProfile,
} from '../_middlewares/middlewares'

const initialStateDefault = {
  firstName: '',
  lastName: '',
  isLoading: false,
  isRememberMe: false,
  isToken: false,
  toggleEdit: false,
  errorMessage: null,
}

// Si local storage non chargé alors charger session storage
const persistedState = loadStateLocalStorage()
  ? loadStateLocalStorage()
  : loadStateSessionStorage()

// Initialisation de inititialState (dépend de la présence ou non du storage)
const initialState = persistedState
  ? persistedState.state.auth
  : initialStateDefault

const authSlice = createSlice({
  name: 'authentification',
  initialState,
  reducers: {
    // action de réinitialisation lors du clic sur Sign out (déconnexion)
    actionLogout: (state) => {
      removeTokenStorage(state.isRememberMe)
      removeState()
      state.firstName = ''
      state.lastName = ''
      state.isLoading = false
      state.isRememberMe = false
      state.isToken = false
      state.toggleEdit = false
    },
    // action "toggle" d'ouverture/fermeture du formulaire d'édition
    actionToggleEdit: (state) => {
      state.toggleEdit = !state.toggleEdit
    },
    // action "toggle" du checkbox "Remember me" du formulaire d'authentification (page Login)
    actionIsRememberMe: (state) => {
      state.isRememberMe = !state.isRememberMe
    },
    // action de réinitialisation du message d'erreur
    actionInitErrorMessage: (state) => {
      state.errorMessage = null
    },
  },

  extraReducers: {
    //Login
    [mwLogin.fulfilled]: (state) => {
      // Booleen isToken : token est-il présent dans le storage du navigateur ?
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [mwLogin.pending]: (state) => {
      state.isLoading = true // début du chargement
    },
    [mwLogin.rejected]: (state, action) => {
      state.isLoading = false // fin du chargement
      state.errorMessage = action.payload.message // récupération du message d'erreur
    },

    // Profile : récupération du prénom et du nom de l'Utilisateur dans la base de données
    [mwGetUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.isLoading = false
      state.isToken = isGetTokenStorage()
      state.errorMessage = null
    },
    [mwGetUserProfile.rejected]: (state, action) => {
      state.errorMessage = action.payload.message // récupération du message d'erreur
    },

    // Profile : modification du prénom et du nom de l'Utilisateur dans la base de données
    [mwUpdateUserProfile.fulfilled]: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.errorMessage = null
    },
    [mwUpdateUserProfile.rejected]: (state, action) => {
      state.toggleEdit = false // "toggle" d'ouverture/fermeture du formulaire d'édition
      state.errorMessage = action.payload.message
    },
  },
})

export const {
  actionIsRememberMe,
  actionToggleEdit,
  actionLogout,
  actionInitErrorMessage,
} = authSlice.actions
export default authSlice.reducer
