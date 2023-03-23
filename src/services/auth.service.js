import axios from 'axios'
import {
  setTokenStorage,
  getTokenStorage,
} from '../utils/tokenStorageFunctions'

const API_URL = 'http://localhost:3001/api/v1/user/'

export const serviceLogin = async (email, password, isRememberMe) => {
  return await axios
    .post(API_URL + 'login', {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.body.token) {
        const token = JSON.stringify(response.data.body.token)
        setTokenStorage(isRememberMe, token)
      }
      return response.data
    })
}
export const serviceGetUserProfile = async (dataUserProfile, isRememberMe) => {
  const token = JSON.parse(getTokenStorage(isRememberMe))
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
      return response.data.body
    })
}

export const serviceUpdateUserProfile = async (updateData, isRememberMe) => {
  const token = JSON.parse(getTokenStorage(isRememberMe))
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
      return response.data.body
    })
}
