import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

import { saveState } from '../utils/stateStorageFunctions'
// import throttle from 'lodash.throttle'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
})

let myStore = {}

store.subscribe(() => {
  myStore = store.getState()
  console.log('STORE subscribe', myStore.auth.isRememberMe)
  if (myStore.auth.isRememberMe === true) {
    saveState({
      state: store.getState(),
    })
  }
})

export default store
