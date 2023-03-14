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

store.subscribe(() => {
  console.log('SUBSCRIBE !!!!')
  saveState({
    state: store.getState(),
  })
})

export default store
