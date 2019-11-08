import React, { useEffect, useRef } from 'react'

import { getInitialData } from 'store/actions/actions'

import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'

const ReactRouterDataSwitchInternal = props => {
  const { isLoading, getData } = props

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false)

    useEffect(() => {
      didMount.current ? func() : (didMount.current = true)
    }, deps)
  }

  if (!IS_SERVER) {
    useDidMountEffect(() => {
      getData(location.pathname)
    }, [location.pathname])
  }

  if (IS_SERVER) {
    return <Switch>{props.children}</Switch>
  } else {
    if (isLoading) {
      return (
        <section className="section">
          <h1 className="section__title">Loading...</h1>
        </section>
      )
    }

    return <Switch>{props.children}</Switch>
  }
}

const mapStateToProps = ({ isLoading }) => {
  return {
    isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: payload => dispatch(getInitialData(payload))
  }
}

export const ReactRouterDataSwitch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactRouterDataSwitchInternal)
