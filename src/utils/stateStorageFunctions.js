// Chargement du state depuis le local storage
export const loadStateLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

// Chargement du state depuis le session storage
export const loadStateSessionStorage = () => {
  try {
    const serializedState = sessionStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

// Sauvegarde du state dans le storage :
//    - local si "Remember me" coché
//    - session si "Remember me" décoché
export const saveState = (type, state) => {
  try {
    const serializedState = JSON.stringify(state)
    type
      ? localStorage.setItem('state', serializedState)
      : sessionStorage.setItem('state', serializedState)
  } catch {
    // ignorer les erreurs d'écriture
  }
}

// Effacement du state dans le local et session storage
export const removeState = () => {
  sessionStorage.removeItem('state')
  localStorage.removeItem('state')
}
