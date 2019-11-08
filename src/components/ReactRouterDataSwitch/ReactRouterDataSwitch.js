import React, { useEffect } from 'react'

import { updateStore, setLoading } from 'actions/actions'

import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'

const ReactRouterDataSwitchInternal = props => {
  const { isLoading, onUpdate, onSetLoading } = props

  const fetchData = async () => {
    const result = await fetch(
      '/api/react-router-data?url=' + encodeURIComponent(location.pathname)
    )
    const data = await result.json()

    onUpdate(data)
  }

  if (!IS_SERVER) {
    useEffect(() => {
      onSetLoading(true)

      fetchData()
        .catch(err => {
          console.log(err)
        })
        .then(() => {
          onSetLoading(false)
        })
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
    onUpdate: payload => dispatch(updateStore(payload)),
    onSetLoading: payload => dispatch(setLoading(payload))
  }
}

export const ReactRouterDataSwitch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactRouterDataSwitchInternal)
