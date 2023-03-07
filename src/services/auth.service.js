import axios from 'axios'
// import { getTokenLocalStorage } from '../utils/tokenStorageFunctions'
import {
  setTokenStorage,
  getTokenStorage,
} from '../utils/tokenStorageFunctions'

const API_URL = 'http://localhost:3001/api/v1/user/'

export const serviceLogin = (email, password) => {
  // console.log('axios serviceLogin !')
  // console.log('url :', API_URL + 'login')
  return axios
    .post(API_URL + 'login', {
      email: email,
      password: password,
    })
    .then((response) => {
      // console.log('response.data', response.data)
      // console.log('response.body', response.data.body)
      // console.log('response.message', response.data.message)
      // if (response.data.accessToken) {
      if (response.data.body) {
        // console.log('serviceLogin data', response.data.body.token)
        // console.log(
        //   'serviceLogin data',
        //   JSON.stringify(response.data.body.token)
        // )
        const typeStorage = false // true: localStorage || false: sessionStorage

        setTokenStorage(typeStorage, JSON.stringify(response.data.body.token))
      }
      return response.data
    })
}
export const serviceGetUserName = async (dataUserProfile) => {
  // const dataName = {}
  console.log('http://localhost:3001/api/v1/user/profile')
  // const typeStorage = false // true: localStorage || false: sessionStorage
  // const token = JSON.parse(getTokenStorage(typeStorage))
  const token = JSON.parse(sessionStorage.getItem('token'))
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
      console.log('getUserName data', response.data.body)
      return response.data.body
    })
    .catch((error) => {
      console.log('error Service user profile', error)
      return error
    })
}
