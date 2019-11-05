import * as React from 'react'

import { render } from 'app'
import reducer from 'reducers/rootReducer'
import { createStore } from 'redux'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { clientRestoreData } from 'data/clientRestoreData'

function start(state) {
  hydrate(
    <Provider store={state}>
      <BrowserRouter>{render()}</BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
}

const store = createStore(reducer, clientRestoreData())
start(store)
