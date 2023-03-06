import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'

export const serviceLogin = (email, password) => {
  console.log('axios serviceLogin !')
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
        localStorage.setItem('user', JSON.stringify(response.data.body.token))
      }
      return response.data
    })
}

export const serviceGetUserName = (profileData, token) => {
  console.log('axios getUserName!')
  const headerConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return axios
    .post(
      'http://localhost:3001/api/v1/user/profile',
      profileData,
      headerConfig
    )
    .then((res) => {
      console.log('getUserName data', res.data.body)
      return res.data.body
    })
    .catch((error) => {
      // console.log('error ds user profile', error)
      return error
    })
}
