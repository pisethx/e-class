import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USER_QUERY } from '../../../constants/user'
import UserProfile from '../../../components/Cards/UserProfile'

const UserShow = (props) => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      id: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  let user = null
  if (data) user = data.user  

  return (
    <>{user && Object.values(user).length > 0 && <UserProfile user={user} />}</>
  )
}

export default UserShow
