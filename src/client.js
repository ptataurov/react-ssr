import React from 'react'

import { render } from 'app'
import rootReducer from 'store/reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { clientRestoreData } from 'data/clientRestoreData'
import thunk from 'redux-thunk'

const start = state => {
  hydrate(
    <Provider store={state}>
      <BrowserRouter>{render()}</BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

const store = createStore(
  rootReducer,
  clientRestoreData(),
  applyMiddleware(thunk)
)

start(store)
