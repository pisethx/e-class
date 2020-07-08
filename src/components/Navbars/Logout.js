import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { DropdownItem } from 'reactstrap'
import { AuthContext, useAuthContext } from 'contexts/auth'
import { useApolloClient } from 'react-apollo';

const USER_LOGOUT_MUTATION = gql`
  mutation USER_LOGOUT_MUTATION {
    logout {
      message
    }
  }
`

const Logout = (props) => {
  const authContext = useAuthContext()
  const client = useApolloClient()

  const [logout, { data, loading, error }] = useMutation(USER_LOGOUT_MUTATION)

  return (
    <DropdownItem
      onClick={async (e) => {
        e.preventDefault()
        try {
          const res = await authContext.logout(logout, authContext)
          client.clearStore()
        } catch (error) {
          console.log(error)
        }
        console.log(props)
        props.history.push('/login')
      }}
      className="nav-item"
    >
      Log out
    </DropdownItem>
  )
}

export default Logout
