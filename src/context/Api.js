import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
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
