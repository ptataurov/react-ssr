import * as React from 'react'
import { Link } from 'react-router-dom'

const ReactRouterDataNavigation = () => {
  return (
    <nav className="nav">
      <Link className="nav__link" to="/">
        Home
      </Link>
      <Link className="nav__link" to="/counter">
        Counter
      </Link>
      <Link className="nav__link" to="/data">
        Data
      </Link>
    </nav>
  )
}

export { ReactRouterDataNavigation }
