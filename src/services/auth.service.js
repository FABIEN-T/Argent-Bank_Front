import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user/'

const register = (email, password, firstName, lastName) => {
  return axios.post(API_URL + 'signup', {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  })
}

const login = (email, password) => {
  console.log('axios !')
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

// const getName = (firstName, lastName) => {
//   console.log('axios !')
//   return axios
//     .get(API_URL + 'login', {
//       firstName: firstName,
//       lastName: lastName,
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem('user', JSON.stringify(response.data))
//       }

//       return response.data
//     })
// }

const getProfile = (firstName, lastName) => {
  return axios.put(API_URL + 'profile', {
    firstName: firstName,
    lastName: lastName,
  })
}

// export const userProfile = async (profileData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   }
//   return await axios
//     .post('http://localhost:3001/api/v1/user/profile', profileData, config)
//     .then((res) => {
//       //retourne les infos du user nom, prenom, mail...
//       // console.log('les datas ds authService', res.data.body)
//       return res.data.body
//     })
//     .catch((error) => {
//       // console.log('error ds user profile', error)
//       return error
//     })
// }

const editProfile = (firstName, lastName) => {
  return axios.put(API_URL + 'profile', {
    firstName: firstName,
    lastName: lastName,
  })
}

const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  editProfile,
  logout,
}

export default authService
