import { UPDATE_STORE, SET_LOADING } from './actionTypes'

export const updateStore = payload => {
  return {
    type: UPDATE_STORE,
    payload
  }
}
export const setLoading = payload => {
  return {
    type: SET_LOADING,
    payload
  }
}
