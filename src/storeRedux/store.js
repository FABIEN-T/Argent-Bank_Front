import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

import { saveState } from '../utils/stateStorageFunctions'

// Création du store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
})

export default store

let myStore = {}
store.subscribe(() => {
  myStore = store.getState()
  const type = myStore.auth.isRememberMe
  // Sauvegarde du state dans le storage :
  //    - local si "Remember me" coché
  //    - session si "Remember me" décoché
  saveState(type, {
    state: store.getState(),
  })
})
