import { matchPath } from 'react-router-dom'

import { routesConfig } from 'routes'

const DATA_SOURCES = {
  data(route) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          user: 'John Snow'
        })
      }, 30)
    })
  }
}

export const reactRouterLoadData = url => {
  let route

  const routeConfig = routesConfig.find(
    ({ path }) => (route = matchPath(url, path))
  )

  if (route && DATA_SOURCES[routeConfig.key]) {
    return DATA_SOURCES[routeConfig.key](route)
  }

  return {}
}
