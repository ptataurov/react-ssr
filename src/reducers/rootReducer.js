import { UPDATE_STORE, SET_LOADING } from 'actions/actionTypes'

const reducer = (state, action) => {
  switch (action.type) {
  case UPDATE_STORE:
    return {
      ...action.payload
    }

  case SET_LOADING:
    return {
      ...state,
      isLoading: action.payload
    }

  default:
    return state
  }
}

export default reducer
