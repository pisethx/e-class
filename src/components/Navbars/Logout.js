import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { DropdownItem } from 'reactstrap'
import { AuthContext } from 'contexts/auth'

const USER_LOGOUT_MUTATION = gql`
  mutation USER_LOGOUT_MUTATION {
    logout {
      message
    }
  }
`

const Logout = (props) => {
  const authContext = useContext(AuthContext)

  const [logout, {data, loading, error}] = useMutation(USER_LOGOUT_MUTATION);

  return (
    <DropdownItem
      onClick={async (e) => {
        e.preventDefault()
        try {
          const res = await authContext.logout(logout, authContext)
          console.log(res);
          
          props.history.push('/login')
          localStorage.clear()
        } catch(error) {
          console.log(error);
          
        }
      }}
      className="nav-item"
    >
      Log out
    </DropdownItem>
  )
}

export default Logout
