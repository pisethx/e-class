import React, { useContext, useEffect, useState } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import AdminLayout from 'layouts/Admin/Admin.js'
import UnauthenticatedLayout from 'layouts/Unauthenticated/Unauthenticated.js'

import ProtectedRoute from 'components/ProtectedRoute'
import routes from 'routes'

import UserShow from 'views/Users/_id/Show'
import ClassShow from 'views/Class/_id/Show'
import ClassEdit from 'views/Class/_id/Edit'

import ClassContentTable from 'views/Class/Content/Table'
import ClassContentCreate from 'views/Class/Content/Create'

import ClassCategoryTable from 'views/Class/Category/Table'
import ClassCategoryCreate from 'views/Class/Category/Create'
import ClassCategoryShow from 'views/Class/Category/_id/Show'

import ClassCategoryExamCreate from 'views/Class/Category/Exam/Create'
import ClassCategoryExamTable from 'views/Class/Category/Exam/Table'
import ClassCategoryExamShow from 'views/Class/Category/Exam/_id/Show'

import ClassForumTable from 'views/Class/Forum/Table'
import ClassForumPost from 'views/Class/Forum/Post'
import ClassForumCreate from 'views/Class/Forum/Create'

import ClassAttendanceTable from 'views/Class/Attendance/Table'
import ClassAttendanceCreate from 'views/Class/Attendance/Create'
import { AuthContext } from 'contexts/auth'
import { useAuthContext } from 'contexts/auth'

const routesProp = routes
const routesAdmin = routes.find((route) => route.layout === 'admin')
const routesUnauthenticated = routes.find((route) => route.layout === 'unauthenticated')

const getImg = (authContext) => authContext?.user?.identity?.photo_url

const AllRoutes = (props) => {
  const authContext = useContext(AuthContext)

  return (
    <>
      <Router history={props.hist}>
        <Switch>
          {routesAdmin.subRoutes.map((route, i) => (
            <ProtectedRoute
              key={i}
              exact={route.exact}
              path={route.path}
              {...props}
              render={(props) => (
                <>
                  <AdminLayout {...props} img={getImg(authContext)} role={authContext.user.roles[0]} routes={routesProp}>
                    <Route {...route} />
                  </AdminLayout>
                </>
              )}
            />
          ))}
          <ProtectedRoute
            exact={true}
            {...props}
            path="/user/:id"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <UserShow {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassShow {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/edit"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassEdit {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/content"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassContentTable {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/content/create"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassContentCreate {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/category"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryTable {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/category/create"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryCreate {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/category/:categoryId"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryShow {...props} id={props.match.params.id} categoryId={props.match.params.categoryId} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id/category/:categoryId/exam/create"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryExamCreate {...props} id={props.match.params.id} categoryId={props.match.params.categoryId} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/category/:categoryId/exam"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryExamTable {...props} id={props.match.params.id} categoryId={props.match.params.categoryId} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/category/:categoryId/exam/:examId"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassCategoryExamShow
                    {...props}
                    id={props.match.params.id}
                    categoryId={props.match.params.categoryId}
                    examId={props.match.params.examId}
                  />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>

          <ProtectedRoute
            exact={true}
            path="/class/:id/forum"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassForumTable {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/forum/create"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassForumCreate {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/forum/:postId"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassForumPost {...props} id={props.match.params.id} postId={props.match.params.postId} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            path="/class/:id/attendance"
            {...props}
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassAttendanceTable {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          <ProtectedRoute
            exact={true}
            {...props}
            path="/class/:id/attendance/create"
            render={(props) => (
              <>
                <AdminLayout img={getImg(authContext)} {...props} routes={routesProp}>
                  <ClassAttendanceCreate {...props} id={props.match.params.id} />
                </AdminLayout>
              </>
            )}
          ></ProtectedRoute>
          {routesUnauthenticated.subRoutes.map((route, i) => (
            <Route key={i} exact={route.exact} path={route.path}>
              <UnauthenticatedLayout img={getImg(authContext)} {...props} routes={routesProp}>
                <Route {...route} />
              </UnauthenticatedLayout>
            </Route>
          ))}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </>
  )
}

export default AllRoutes
