export function getTokenStorage(typeStorage) {
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

// export const getTokenLocalStorage = () => {
//   return localStorage.getItem('token')
// }

// export const removeTokenLocalStorage = () => {
//   localStorage.removeItem('token')
// }

// export const setTokenLocalStorage = (val) => {
//   localStorage.setItem('token', val)
// }
