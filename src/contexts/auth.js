import { createContext, useContext } from 'react'
import role from '../constants/data'

export function useAuthContext() {
  return useContext(AuthContext)
}

const setAuthContext = (context, data, refreshTokenGql) => {
  // console.log('try set authContext')
  console.log(data)
  if (data.refresh_token) {
    localStorage.setItem('refreshToken', data.refresh_token)
  }

  context.isLogin = true
  context.accessToken = data.access_token
  context.user = data.user

  role.name = context.user.roles[0].name
  console.log(role)

  // console.log(context)

  // setTimeout(
  //   context.refreshToken,
  //   data.expires_in * 1000,
  //   refreshTokenGql,
  //   context
  // )
}

const AuthContext = createContext({
  user: null,
  isLogin: false,
  accessToken: null,
  login: async (loginGql, context, refreshTokenGql) => {
    const res = await loginGql()

    setAuthContext(context, res.data.login, refreshTokenGql)
  },
  logout: async (logoutGql, context) => {
    await logoutGql()

    localStorage.removeItem('refreshToken')
    context.isLogin = false
    context.accessToken = null
    context.user = null
  },
  refreshToken: async (refreshTokenGql, context) => {
    try {
      let res = await refreshTokenGql({
        variables: {
          refreshToken: localStorage.getItem('refreshToken'),
        },
      })

      // let me = await meGql()
      // console.log(me);
      setAuthContext(context, res.data.refreshToken, refreshTokenGql)
      // console.log('done refresh token')
    } catch (e) {
      // localStorage.removeItem('refreshToken')
      return
    }
  },
})

export { AuthContext, setAuthContext }
