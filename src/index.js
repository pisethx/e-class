import React, { useContext, useEffect, useState } from 'react'
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
import { AuthContext, useAuthContext } from './contexts/auth'
import routes from './routes'

import UserShow from 'views/Users/_id/Show'
import ClassShow from 'views/Class/_id/Show'
import ClassEdit from 'views/Class/_id/Edit'

import ClassContentTable from 'views/Class/Content/Table'
import ClassContentCreate from 'views/Class/Content/Create'

import ClassCategoryTable from 'views/Class/Category/Table'
import ClassCategoryCreate from 'views/Class/Category/Create'
import ClassCategoryShow from 'views/Class/Category/_id/Show'

import ClassForumTable from 'views/Class/Forum/Table'
import ClassForumCreate from 'views/Class/Forum/Create'

const hist = createBrowserHistory()

const App = () => {
  // const authContext = useAuthContext()
  const authContext = useContext(AuthContext)
  const routesProp = routes
  const routesAdmin = routes.find((route) => route.layout === 'admin')
  const routesUnauthenticated = routes.find(
    (route) => route.layout === 'unauthenticated'
  )

  console.log(routesUnauthenticated);
  

  const client = new ApolloClient({
    cors: 'https://cors-anywhere.herokuapp.com/',
    uri: 'https://api.raymond.digital/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    request: (operation) => {
      if (authContext?.accessToken) {
        operation.setContext({
          headers: {
            Authorization: `Bearer ${authContext.accessToken}`,
          },
        })
      } else {
        return '<p>Loading...</p>'
        // return hist.push('/login')
      }
    },
  })

  return (
    <ApolloProvider client={client}>
      <Router history={hist}>
        <Switch>
          {routesAdmin.subRoutes.map((route, i) => (
            <ProtectedRoute
              key={i}
              exact={route.exact}
              path={route.path}
              {...hist}
              render={(props) => (
                <>
                  <AdminLayout {...hist} routes={routesProp}>
                    <Route {...route} />
                  </AdminLayout>
                </>
              )}
            />
          ))}

          <ProtectedRoute
            exact={true}
            {...hist}
            {...hist}
            path="/user/:id"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <UserShow {...hist} {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id"
            {...hist}
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassShow {...hist} {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            {...hist}
            path="/class/:id/edit"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassEdit {...hist} {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            {...hist}
            path="/class/:id/content"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassContentTable
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            {...hist}
            path="/class/:id/content/create"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassContentCreate
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id/category"
            {...hist}
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassCategoryTable
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            {...hist}
            path="/class/:id/category/create"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassCategoryCreate
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id/category/:categoryId"
            {...hist}
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassCategoryShow
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                    categoryId={props.match.params.categoryId}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id/forum"
            {...hist}
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassForumTable
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            {...hist}
            path="/class/:id/forum/create"
            render={(props) => (
              <>
                <AdminLayout {...hist} routes={routesProp}>
                  <ClassForumCreate
                    {...hist}
                    {...props}
                    id={props.match.params.id}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          {routesUnauthenticated.subRoutes.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path}>
              <UnauthenticatedLayout {...hist} routes={routesProp}>
                <Route {...route} />
              </UnauthenticatedLayout>
            </Route>
          ))}
          {/* <ProtectedRoute
            exact
            path="/"
            render={(props) => <AdminLayout {...props} />}
          />
          <ProtectedRoute
            exact
            path="/users"
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
          <ProtectedRoute
            exact
            path="/classes"
            render={(props) => <AdminLayout {...props} />}
          />
          <ProtectedRoute
            exact
            path="/classes/create"
            render={(props) => <AdminLayout {...props} />}
          />

          <ProtectedRoute
            exact
            path="/class"
            render={(props) => <AdminLayout {...props} />}
          />
          <Route
            path="/class/:slug"
            render={(props) => <AdminLayout {...props} />}
          />
          <Route
            path="/class/edit/:slug"
            render={(props) => <AdminLayout {...props} />}
          /> */}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

render(<App />, document.getElementById('root'))
