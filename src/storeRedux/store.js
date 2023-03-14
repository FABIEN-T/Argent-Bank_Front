import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'

import { saveState } from '../utils/saveLoadState'
// import throttle from 'lodash.throttle'

// const persistedState = loadState()

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
  // persistedState,
})

store.subscribe(() => {
  saveState({
    state: store.getState(),
  })
})

export default store
