import axios from 'axios'
// import { getTokenLocalStorage } from '../utils/tokenStorageFunctions'
import {
  setTokenStorage,
  getTokenStorage,
} from '../utils/tokenStorageFunctions'

const API_URL = 'http://localhost:3001/api/v1/user/'

export const serviceLogin = async (email, password) => {
  // console.log('url :', API_URL + 'login')
  return await axios
    .post(API_URL + 'login', {
      email: email,
      password: password,
    })
    .then((response) => {
      // if (response.data.accessToken) {
      if (response.data.body.token) {
        // console.log('serviceLogin data', response.data.body.token)
        // console.log(
        //   'serviceLogin data',
        //   JSON.stringify(response.data.body.token)
        // )
        // const typeStorage = false // true: localStorage || false: sessionStorage
        // setTokenStorage(typeStorage, JSON.stringify(response.data.body.token))
        const token = JSON.stringify(response.data.body.token)
        localStorage.setItem('token', token)
      }
      return response.data
    })
}
export const serviceGetUserProfile = async (dataUserProfile) => {
  // console.log('http://localhost:3001/api/v1/user/profile')
  // const typeStorage = false // true: localStorage || false: sessionStorage
  // const token = getTokenStorage(typeStorage)
  // const token = JSON.parse(sessionStorage.getItem('token'))
  const token = JSON.parse(localStorage.getItem('token'))
  console.log('serviceGetUserName token', token)

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

export const serviceUpdateUserProfile = async (updateData, token) => {
  // const typeStorage = false // true: localStorage || false: sessionStorage
  // const token = getTokenStorage(typeStorage)
  // const token = JSON.parse(sessionStorage.getItem('token'))
  // const esstoken = JSON.parse(token)
  console.log('service updateData token', token)
  console.log('service updateData', updateData)
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
