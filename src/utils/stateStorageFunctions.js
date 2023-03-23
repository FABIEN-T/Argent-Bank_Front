export const loadStateLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    sessionStorage.removeItem('state')
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

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

export const removeState = (type) => {
  sessionStorage.removeItem('state')
  localStorage.removeItem('state')
}
