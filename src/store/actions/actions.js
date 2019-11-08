import { UPDATE_STORE, SET_LOADING } from './actionTypes'

export const getInitialData = path => async dispatch => {
  dispatch(setLoading(true))

  const result = await fetch(
    '/api/react-router-data?url=' + encodeURIComponent(path)
  )

  const data = await result.json()

  dispatch(updateStore(data))

  dispatch(setLoading(false))
}

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
