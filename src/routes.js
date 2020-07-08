import Dashboard from 'views/Dashboard.js'
import Icons from 'views/Icons.js'
import Map from 'views/Map.js'
import Notifications from 'views/Notifications.js'
import Rtl from 'views/Rtl.js'
import TableList from 'views/TableList.js'
import Typography from 'views/Typography.js'
import MyProfile from 'views/Users/MyProfile.js'
import Login from 'views/Unauthenticated/Login.js'
import Register from 'views/Unauthenticated/Register.js'
import ForgotPassword from 'views/Unauthenticated/ForgotPassword.js'
import ResetPassword from 'views/Unauthenticated/ResetPassword.js'
import UserTable from 'views/Users/Table.js'
import ClassCreate from 'views/Class/Create.js'
import ClassTable from 'views/Class/Table'

import MyClass from 'views/Class/MyClass'

import AdminLayout from './layouts/Admin/Admin'
import UnauthenticatedLayout from './layouts/Unauthenticated/Unauthenticated'

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

const all = (role) => {
  return true
}

const exceptAdmin = (role) => {
  console.log(role)

  if (role === 'admin') return false
  return true
}

const onlyAdmin = (role) => {
  if (role === 'admin') return true
  return false
}

const routes = [
  {
    layout: 'admin',
    subRoutes: [
      {
        exact: true,
        path: '/',
        name: 'Dashboard',
        checkRole: all,

        component: Dashboard,
      },
      {
        exact: true,
        path: '/user',
        name: 'My Profile',
        checkRole: all,
        component: MyProfile,
      },
      {
        exact: true,
        path: '/class',
        name: 'My Class',
        checkRole: exceptAdmin,
        component: MyClass,
      },
      {
        exact: true,
        path: '/users',
        name: 'Users',
        checkRole: onlyAdmin,
        component: UserTable,
      },
      {
        exact: true,
        path: '/classes',
        name: 'Classes',
        checkRole: onlyAdmin,

        component: ClassTable,
      },
      {
        exact: true,
        path: '/classes/create',
        name: 'Create Class',
        checkRole: onlyAdmin,
        component: ClassCreate,
      },
    ],
  },
  {
    layout: 'unauthenticated',
    subRoutes: [
      {
        exact: true,
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        exact: true,
        path: '/register',
        name: 'Register',
        checkRole: onlyAdmin,
        component: Register,
      },
      {
        exact: true,
        path: '/forgot-password',
        name: 'Forgot Password',
        component: ForgotPassword,
      },
      {
        exact: true,
        path: '/reset-password',
        name: 'Reset Password',
        component: ResetPassword,
      },
    ],
  },
]

export default routes
