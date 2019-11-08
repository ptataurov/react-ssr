import { matchPath } from 'react-router-dom'

import { routesConfig } from 'routes'

const initialState = {
  isLoading: false
}

const DATA_SOURCES = {
  data() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: 'John Snow',
          ...initialState
        })
      }, 1000)
    })
  }
}

const reactRouterLoadData = url => {
  let route

  const routeConfig = routesConfig.find(
    ({ path }) => (route = matchPath(url, path))
  )

  if (route && DATA_SOURCES[routeConfig.key]) {
    return DATA_SOURCES[routeConfig.key](route)
  }

  return initialState
}

export { reactRouterLoadData }
