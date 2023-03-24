// Récupération du token dans le storage du navigateur :
//    - local si "Remember me" coché (type === true)
//    - session si "Remember me" décoché (type === false)
export function getTokenStorage(type) {
  return type ? localStorage.getItem('token') : sessionStorage.getItem('token')
}

// Effacement du token dans le storage du navigateur :
export function removeTokenStorage(type) {
  return type
    ? localStorage.removeItem('token')
    : sessionStorage.removeItem('token')
}

// Ecriture du token dans le storage du navigateur :
export function setTokenStorage(type, val) {
  return type
    ? localStorage.setItem('token', val)
    : sessionStorage.setItem('token', val)
}

// vérifie si le token est mémorisé dans le storage du navigateur (local ou session)
export function isGetTokenStorage() {
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}
