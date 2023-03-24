import axios from 'axios'
import {
  setTokenStorage,
  getTokenStorage,
} from '../_utils/tokenStorageFunctions'

const API_URL = 'http://localhost:3001/api/v1/user/'

// Page Login : Authentification de l'utilisateur par email et mot de passe,
export const serviceLogin = async (email, password, isRememberMe) => {
  return await axios
    .post(API_URL + 'login', {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.body.token) {
        const token = JSON.stringify(response.data.body.token)
        // mémorisation du token dans le storage du navigateur
        setTokenStorage(isRememberMe, token)
      }
    })
}

// Page Profile : Récupération  du prénom et du nom dans la base de données
export const serviceGetUserProfile = async (dataUserProfile, isRememberMe) => {
  const token = JSON.parse(getTokenStorage(isRememberMe))
  // recupération du token depuis le storage du navigateur et implémentation dans le header pour autorisation
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
      // retourne les données de l'utilisateur
      return response.data.body
    })
}

// Page Profile : Mise à jour du prénom et du nom dans la base de données
export const serviceUpdateUserProfile = async (updateData, isRememberMe) => {
  const token = JSON.parse(getTokenStorage(isRememberMe))
  // recupération du token du navigateur et utilisation dans le header pour autorisation
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
      // retourne les données modifiées de l'utilisateur
      return response.data.body
    })
}
