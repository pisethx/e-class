import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const CURRENT_USER_QUERY = gql`
  query {
    me {
      username
      email
      uuid
      identity {
        id
        first_name
        last_name
        gender
        contact_number
        photo_url
      }
      learnings {
        code
      }
      teachings {
        code
      }
    }
  }
`

const useUser = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY)
  if (data) {
    return data.me
  } else {
    props.history.push('/login')
  }
}

export { CURRENT_USER_QUERY, useUser }
