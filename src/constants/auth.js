import gql from 'graphql-tag'

export const GET_ENUM_QUERY = gql`
  query GET_ENUM_QUERY($name: String!) {
    __type(name: $name) {
      enumValues {
        name
      }
    }
  }
`

export const USER_REGISTER_MUTATION = gql`
  mutation USER_REGISTER_MUTATION(
    $username: String!
    $password: String!
    $email: String!
    $first_name: String!
    $last_name: String!
    $gender: Gender!
  ) {
    createUser(
      input: {
        username: $username
        password: $password
        email: $email
        identity: {
          create: {
            first_name: $first_name
            last_name: $last_name
            gender: $gender
          }
        }
      }
    ) {
      username
    }
  }
`

export const USER_LOGIN_MUTATION = gql`
  mutation USER_LOGIN_MUTATION($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      refresh_token
      access_token
      expires_in
      user {
        id
        username
        email
        uuid
        unreadNotificationsCount
        roles {
          name
        }
        identity {
          first_name
          last_name
          gender
          contact_number
          photo_url
        }
        learnings {
          id
          code
          name
          teacher {
            identity {
              first_name
              last_name
            }
          }
          schedules {
            day
            sessions {
              start_time
              end_time
            }
          }
        }
        teachings {
          id
          code
          name
          teacher {
            identity {
              first_name
              last_name
            }
          }
          schedules {
            day
            sessions {
              start_time
              end_time
            }
          }
        }
      }
    }
  }
`

export const REFRESH_TOKEN_MUTATION = gql`
  mutation REFRESH_TOKEN_MUTATION($refreshToken: String!) {
    refreshToken(input: { refresh_token: $refreshToken }) {
      refresh_token
      access_token
      expires_in
    }
  }
`

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation FORGOT_PASSWORD_MUTATION($username: String!) {
    forgotPassword(input: { username: $username }) {
      status
      statusCode
      message
    }
  }
`

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $username: String!
    $password: String!
    $otp: Int!
  ) {
    resetPassword(
      input: { username: $username, password: $password, otp: $otp }
    ) {
      status
      statusCode
      message
    }
  }
`
