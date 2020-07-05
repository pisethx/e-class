import React from 'react'
import UserShow from 'views/Users/_id/Show'
import ClassShow from 'views/Class/_id/Show'
import ClassEdit from 'views/Class/_id/Edit'
import ClassContentTable from 'views/Class/Content/Table'
import ClassContentCreate from 'views/Class/Content/Create'
import ClassCategoryTable from 'views/Class/Category/Table'
import ClassCategoryCreate from 'views/Class/Category/Create'
import ClassForumTable from 'views/Class/Forum/Table'
import ClassForumCreate from 'views/Class/Forum/Create'

import AdminLayout from 'layouts/Admin/Admin.js'

import ProtectedRoute from 'components/ProtectedRoute'
import routes from '../../routes'

const DynamicRoutes = ({ hist }) => {
  const routesProp = routes

  return (
    <>
      <ProtectedRoute
        exact={true}
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
    </>
  )
}

export default DynamicRoutes
