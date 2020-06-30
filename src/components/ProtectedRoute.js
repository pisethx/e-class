import React, { useContext, useEffect, useState } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { setAuthContext, AuthContext, useAuthContext } from '../contexts/auth'
import {
  useMutation,
  Mutation,
  useQuery,
  useLazyQuery,
  useApolloClient,
} from 'react-apollo'
import { REFRESH_TOKEN_MUTATION } from 'views/Unauthenticated/Api'
import { ME_QUERY } from '../constants/user'

import { Spinner } from 'reactstrap'

const ProtectedRoute = ({ render: Render, ...rest }) => {
  const client = useApolloClient()
  const authContext = useContext(AuthContext)
  const auth = useAuthContext()
  const { error, loading, data } = useQuery(ME_QUERY) // data is undefined because theres no token yet

  const [refreshToken, {}] = useMutation(REFRESH_TOKEN_MUTATION)

  const [isRefreshingToken, setIsRefreshingToken] = useState(false)

  useEffect(() => {
    async function queryMe() {
      try {
        const res = await client.query({
          query: ME_QUERY,
        })
        console.log(res)
        return res.data.me
      } catch (e) {
        console.log(e)
        rest.history.push('/login')
      }
    }

    async function refresh() {
      if (!authContext.isLogin) {
        if (localStorage.getItem('refreshToken')) {
          try {
            await authContext.refreshToken(refreshToken, authContext)

            const me = await queryMe()

            setAuthContext(
              authContext,
              { access_token: authContext.accessToken, user: me },
              refreshToken
            )
            rest.history.push(rest.path)
          } catch (e) {
            // console.log(e)
            rest.history.push('/login')
          }
        } else {
          rest.history.push('/login')
        }
      }
    }

    console.log(auth)
    if (!auth.isLogin) refresh()
  }, [authContext])

  if (auth.isLogin && auth.user !== undefined) {
    return <Route {...rest} render={Render} />
  } else return <p>Loading..</p>
}

export default withRouter(ProtectedRoute)
