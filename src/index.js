import React, { useContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { ApolloProvider, useMutation } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

import 'assets/scss/black-dashboard-react.scss'
import 'assets/demo/demo.css'
import 'assets/css/nucleo-icons.css'

import { AuthContext, useAuthContext } from './contexts/auth'
import AllRoutes from 'components/AllRoutes'

const hist = createBrowserHistory()

const App = () => {
  const authContext = useContext(AuthContext)
  const cors = 'https://cors-anywhere.herokuapp.com/'

  const request = (operation) => {
    if (authContext?.accessToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authContext.accessToken}`,
        },
      })
    }
  }

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle
        Promise.resolve(operation)
          .then((oper) => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            })
          })
          .catch(observer.error.bind(observer))

        return () => {
          if (handle) handle.unsubscribe()
        }
      })
  )

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError) console.log(`[Network error]: ${networkError}`)
      }),
      requestLink,
      new createUploadLink({
        uri: 'https://api.raymond.digital/graphql',
        credentials: 'same-origin',
      }),
    ]),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <AllRoutes hist={hist} />
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'))
