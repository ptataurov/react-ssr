import * as React from 'react'

const DataComponent = ({ user }) => {
  return (
    <section className="section">
      <h1 className="section__title">Hello, {user}!</h1>
    </section>
  )
}

export { DataComponent }
