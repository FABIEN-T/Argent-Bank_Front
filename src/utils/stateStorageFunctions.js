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
    // ignore write errors
  }
}

export const removeState = (type) => {
  try {
    type ? localStorage.removeItem('state') : sessionStorage.removeItem('state')
  } catch {
    // ignore write errors
  }
}

// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state')
//     if (serializedState === null) {
//       return undefined
//     }
//     return JSON.parse(serializedState)
//   } catch (err) {
//     return undefined
//   }
// }

// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem('state', serializedState)
//   } catch {
//     // ignore write errors
//   }
// }
