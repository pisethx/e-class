import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CURRENT_USER_QUERY } from 'lib/User'
import { useAuthContext } from 'contexts/auth'
import UserProfile from 'components/Cards/UserProfile'
// reactstrap components

const MyProfile = (props) => {
  // const authContext = useContext(AuthContext)
  const { user } = useAuthContext()
  // const { loading, error, data } = useQuery(CURRENT_USER_QUERY)

  // if (loading) return <Spinner />
  // if (error) return `Error! ${error}`
  // useEffect(() => {
  //   setUser(() => authContext.user)
  // }, [authContext])

  return <>{user && Object.values(user).length > 0 && <UserProfile user={user} />}</>
}

export default MyProfile
