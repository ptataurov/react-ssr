import React from 'react'

import { render } from 'app'
import rootReducer from 'store/reducers/rootReducer'
import { createStore, compose, applyMiddleware } from 'redux'
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

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const store = createStore(
  rootReducer,
  clientRestoreData(),
  composeEnhancers(applyMiddleware(thunk))
)

start(store)
