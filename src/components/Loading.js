import React from 'react'
import { Spinner } from 'reactstrap'

const Loading = (props) => {
  return (
    <div
      style={{
        zIndex: '10000',
        position: 'fixed',
        top: '50%',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Spinner type="grow" color="primary" />
    </div>
  )
}

export default Loading
