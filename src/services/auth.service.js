import axios from 'axios'
import {
  setTokenStorage,
  getTokenStorage,
} from '../utils/tokenStorageFunctions'

const API_URL = 'http://localhost:3001/api/v1/user/'

export const serviceLogin = async (email, password, isRememberMe) => {
  // console.log('serviceLogin isRememberMe', isRememberMe)
  return await axios
    .post(API_URL + 'login', {
      email: email,
      password: password,
    })
    .then((response) => {
      // if (response.data.accessToken) {
      if (response.data.body.token) {
        const token = JSON.stringify(response.data.body.token)
        setTokenStorage(isRememberMe, token)
      }
      return response.data
    })
}
export const serviceGetUserProfile = async (dataUserProfile, isRememberMe) => {
  // if (isRememberMe === false) {
  //   console.log('gestUser remember', isRememberMe)
  //   localStorage.removeItem('state')
  //   localStorage.clear()

  // const token = JSON.parse(getTokenStorage(false))
  const token = JSON.parse(getTokenStorage(isRememberMe))
  // console.log('serviceGetUserName token', token)

  const headerConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  return await axios
    .post(API_URL + 'profile', dataUserProfile, headerConfig)
    .then((response) => {
      // console.log('getUserName data', response.data.body)
      return response.data.body
    })
    .catch((error) => {
      console.log('error Service user profile', error)
      return error
    })
}

export const serviceUpdateUserProfile = async (updateData, isRememberMe) => {
  // const typeStorage = true // true: localStorage || false: sessionStorage
  const token = JSON.parse(getTokenStorage(isRememberMe))
  // const token = JSON.parse(sessionStorage.getItem('token'))
  // const esstoken = JSON.parse(token)
  // console.log('service updateData token', token)
  // console.log('service updateData', updateData)
  const headerConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  return await axios
    .put(API_URL + 'profile', updateData, headerConfig)
    .then((response) => {
      // console.log('getUserName data', response.data.body)
      return response.data.body
    })
    .catch((error) => {
      console.log('error Service user profile', error)
      return error
    })
}
