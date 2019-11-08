import React from 'react'

import { connect } from 'react-redux'
import { DataComponent } from 'components/DataComponent/DataComponent'

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export const ReactRouterDataComponent = connect(mapStateToProps)(({ user }) => (
  <DataComponent user={user} />
))
