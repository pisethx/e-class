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

const DisplayError = ({ error = null }) => {
  // if (message)
  //   return (
  //     <>
  //       <Alert style={{ margin: 30, marginBottom: 0 }} color="danger">
  //         {message}
  //       </Alert>
  //     </>
  //   )

  if (!error) return null
  if (!error.message)
    return (
      <Alert style={{ margin: 30, marginBottom: 0 }} color="danger">
        Something went wrong
      </Alert>
    )
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-testid="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }

  const errorMsg = error?.graphQLErrors[0]?.extensions?.reason

  return (
    <>
      {errorMsg && (
        <Alert style={{ margin: 30, marginBottom: 0 }} color="danger">
          {errorMsg}
        </Alert>
      )}
    </>
  )
}

export default DisplayError
