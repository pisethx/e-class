import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { DropdownItem } from 'reactstrap'

const USER_LOGOUT_MUTATION = gql`
  mutation USER_LOGOUT_MUTATION {
    logout {
      message
    }
  }
`

const Logout = (props) => {
  const [logout, { error, data }] = useMutation(USER_LOGOUT_MUTATION)

  return (
    <DropdownItem
      onClick={async (e) => {
        e.preventDefault()
        try {
          const res = await logout()
          props.history.push('/login')
          localStorage.clear()
        } catch {}
      }}
      className="nav-item"
    >
      Log out
    </DropdownItem>
  )
}

export default Logout
