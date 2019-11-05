const reducer = (state, action) => {
  if (!action) {
    return state
  }

  if (action.type === 'UPDATE_STORE') {
    return action.payload
  }

  return state
}

export default reducer
