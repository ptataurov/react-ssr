import React, { useState, useEffect } from 'react'

const DynamicCounterExample = () => {
  const [counter, setCounter] = useState(0)

  let interval

  useEffect(() => {
    interval = setInterval(() => setCounter(counter + 1), 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className="section">
      <h1 className="section__title">Counter {counter}</h1>
    </div>
  )
}

export { DynamicCounterExample }
