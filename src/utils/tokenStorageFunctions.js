export function getTokenStorage(type) {
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

export function isGetTokenStorage() {
  if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}
