import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { USER_QUERY } from 'constants/user'
import UserProfile from 'components/Cards/UserProfile'
import { withRouter } from 'react-router-dom';

const UserShow = (props) => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      id: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return console.log(error);

  let user = null
  if (data) user = data?.user
  return (
    <>{user && Object.values(user).length > 0 && <UserProfile user={user} />}</>
  )
}

export default withRouter(UserShow)
