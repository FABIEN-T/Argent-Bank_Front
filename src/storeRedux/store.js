import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

import { removeState, saveState } from '../utils/stateStorageFunctions'
// import throttle from 'lodash.throttle'

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
  console.log('STORE subscribe', myStore.auth)
  const type = myStore.auth.isRememberMe
  if (type !== null) {
    saveState(type, {
      state: store.getState(),
    })
  }
  // else {
  //   removeState(type)
  // }
})
