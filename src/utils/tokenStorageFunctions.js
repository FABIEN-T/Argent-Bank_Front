export function getTokenStorage(type) {
  console.log('Storage !', type)
  return type ? localStorage.getItem('token') : sessionStorage.getItem('token')
}

export function removeTokenStorage(type) {
  return type
    ? localStorage.removeItem('token')
    : sessionStorage.removeItem('token')
}

export function setTokenStorage(type, val) {
  return type
    ? localStorage.setItem('token', val)
    : sessionStorage.setItem('token', val)
}
