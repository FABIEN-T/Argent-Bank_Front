import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import messageReducer from './message'

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
  devTools: true,
})

export default store
