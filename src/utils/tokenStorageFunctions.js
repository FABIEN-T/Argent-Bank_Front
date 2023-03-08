export function getTokenStorage(typeStorage) {
  console.log('Storage !', typeStorage)
  typeStorage ? localStorage.getItem('token') : sessionStorage.getItem('token')
}

export function removeTokenStorage(typeStorage) {
  typeStorage
    ? localStorage.removeItem('token')
    : sessionStorage.removeItem('token')
}

export function setTokenStorage(typeStorage, val) {
  typeStorage
    ? localStorage.setItem('token', val)
    : sessionStorage.setItem('token', val)
}
