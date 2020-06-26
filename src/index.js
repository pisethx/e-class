import React, { useContext, useEffect } from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, useMutation } from '@apollo/react-hooks'

import AdminLayout from 'layouts/Admin/Admin.js'
import UnauthenticatedLayout from 'layouts/Unauthenticated/Unauthenticated.js'
import RTLLayout from 'layouts/RTL/RTL.js'

import 'assets/scss/black-dashboard-react.scss'
import 'assets/demo/demo.css'
import 'assets/css/nucleo-icons.css'

import ProtectedRoute from 'components/ProtectedRoute'
import { AuthContext } from './contexts/auth'

const hist = createBrowserHistory()

const App = () => {
  const authContext = useContext(AuthContext)

  const client = new ApolloClient({
    uri: 'https://api.raymond.digital/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    request: (operation) => {
      const token = authContext.accessToken
      console.log(authContext)

      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    },
  })

  return (
    <ApolloProvider client={client}>
      <Router history={hist}>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            render={(props) => <AdminLayout {...props} />}
          />
          <ProtectedRoute
            exact
            path="/user-profile"
            render={(props) => <AdminLayout {...props} />}
          />
          <ProtectedRoute
            path="/rtl"
            render={(props) => <RTLLayout {...props} />}
          />
          <Route
            path="/login"
            render={(props) => <UnauthenticatedLayout {...props} />}
          />
          <ProtectedRoute
            path="/register"
            render={(props) => <UnauthenticatedLayout {...props} />}
          />
          <Route
            exact
            path="/class"
            render={(props) => <AdminLayout {...props} />}
          />
          <Route
            exact
            path="/class/create"
            render={(props) => <AdminLayout {...props} />}
          />

          <Redirect from="*" to="/" />
        </Switch>
      </Router>
      ,
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'))
