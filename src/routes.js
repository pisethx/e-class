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

const routes = [
  {
    layout: 'admin',
    subRoutes: [
      {
        exact: true,
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        exact: true,
        path: '/user',
        name: 'My Profile',
        component: MyProfile,
      },
      {
        exact: true,
        path: '/class',
        name: 'My Class',
        component: MyClass,
      },
      {
        exact: true,
        path: '/users',
        name: 'Users',
        component: UserTable,
      },
      {
        exact: true,
        path: '/classes',
        name: 'Classes',
        component: ClassTable,
      },
      {
        exact: true,
        path: '/classes/create',
        name: 'Create Class',
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

var routes1 = [
  {
    path: '/',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: 'tim-icons icon-chart-pie-36',
    component: Dashboard,
    layout: '/admin',
  },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   rtlName: 'الرموز',
  //   icon: 'tim-icons icon-atom',
  //   component: Icons,
  //   layout: '/admin',
  // },
  // {
  //   path: '/map',
  //   name: 'Map',
  //   rtlName: 'خرائط',
  //   icon: 'tim-icons icon-pin',
  //   component: Map,
  //   layout: '/admin',
  // },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   rtlName: 'إخطارات',
  //   icon: 'tim-icons icon-bell-55',
  //   component: Notifications,
  //   layout: '/admin',
  // },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   rtlName: 'ملف تعريفي للمستخدم',
  //   icon: 'tim-icons icon-single-02',
  //   component: MyProfile,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Table List',
  //   rtlName: 'قائمة الجدول',
  //   icon: 'tim-icons icon-puzzle-10',
  //   component: TableList,
  //   layout: '/admin',
  // },
  // {
  //   path: '/typography',
  //   name: 'Typography',
  //   rtlName: 'طباعة',
  //   icon: 'tim-icons icon-align-center',
  //   component: Typography,
  //   layout: '/admin',
  // },
  // {
  //   path: '/rtl-support',
  //   name: 'RTL Support',
  //   rtlName: 'ار تي ال',
  //   icon: 'tim-icons icon-world',
  //   component: Rtl,
  //   layout: '/rtl',
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   icon: 'tim-icons icon-atom',
  //   component: Login,
  //   layout: '/unauthenticated',
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   icon: 'tim-icons icon-atom',
  //   component: Register,
  //   layout: '/unauthenticated',
  // },
  // {
  //   path: '/login/forgot-password',
  //   name: 'Forgot Password',
  //   icon: 'tim-icons icon-atom',
  //   component: ForgotPassword,
  //   layout: '/unauthenticated',
  // },
  // {
  //   path: '/login/reset-password',
  //   name: 'Reset Password',
  //   icon: 'tim-icons icon-atom',
  //   component: ResetPassword,
  //   layout: '/unauthenticated',
  // },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   icon: 'tim-icons icon-single-02',
  //   component: MyProfile,
  //   layout: '/admin',
  // },
  // {
  //   path: '/users',
  //   name: 'Users',
  //   icon: 'tim-icons icon-single-02',
  //   component: UserTable,
  //   layout: '/admin',
  // },
  // {
  //   path: '/classes',
  //   name: 'Classes',
  //   icon: 'tim-icons icon-single-02',
  //   component: ClassDashboard,
  //   layout: '/admin',
  // },
  // {
  //   path: '/classes/create',
  //   name: 'Create Class',
  //   icon: 'tim-icons icon-single-02',
  //   component: ClassCreate,
  //   layout: '/admin',
  // },
  // {
  //   path: '/class',
  //   name: 'My Class',
  //   icon: 'tim-icons icon-single-02',
  //   component: MyClass,
  //   layout: '/admin',
  // },
  // {
  //   path: '/class/:slug',
  //   name: 'Go to Class',
  //   icon: 'tim-icons icon-single-02',
  //   component: EachClass,
  //   layout: '/admin',
  // },
]

export default routes
