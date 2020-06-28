import styled from 'styled-components'
import React from 'react'

// reactstrap components
import { Alert } from 'reactstrap'

const ErrorStyles = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid $reddit;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

const DisplaySuccess = ({ success = 'Success' }) => {
  return (
    <>
      {success && (
        <Alert style={{ margin: 30, marginBottom: 0 }} color="success">
          {success}
        </Alert>
      )}
    </>
  )
}

export default DisplaySuccess
