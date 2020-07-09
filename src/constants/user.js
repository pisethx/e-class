import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      username
      email
      uuid
      unreadNotificationsCount
      roles {
        id
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
`

export const USER_QUERY = gql`
  query USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      username
      email
      uuid
      unreadNotificationsCount
      roles {
        id
        name
      }
      identity {
        id
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
          id
          identity {
            id
            first_name
            last_name
          }
        }
        schedules {
          id
          day
          sessions {
            id
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
          id
          identity {
            id
            first_name
            last_name
          }
        }
        schedules {
          id
          day
          sessions {
            id
            start_time
            end_time
          }
        }
      }
    }
  }
`

export const USERS_FIND_BY_UUID_QUERY = gql`
  query USERS_FIND_BY_UUID_QUERY($uuid: String!) {
    usersFindByUuid(uuid: $uuid) {
        id
        username
        email
        uuid
        roles {
          id  
          name
        }
        identity {
          first_name
          last_name
          gender
          contact_number
          photo_url
        }
    }
  }
`

export const USERS_FIND_BY_USERNAME_QUERY = gql`
  query USERS_FIND_BY_USERNAME_QUERY(
    $username: String!
  ) {
    usersFindByUsername(username: $username) {
        id
        username
        email
        uuid
        roles {
          id
          name
        }
        identity {
          first_name
          last_name
          gender
          contact_number
          photo_url
        }
    }
  }
`

export const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      username
      email
      uuid
      roles {
        id
        name
      }
      identity {
        id
        first_name
        last_name
        gender
        photo_url
      }
    }
  }
`

export const CHANGE_EMAIL_MUTATION = gql`
  mutation CHANGE_EMAIL_MUTATION(
    $id: ID!
    $email: String!
  ) {
    updateUser(
      input: {id: $id, email: $email}
    ) {
      id
      email
    }
  }
`

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation CHANGE_PASSWORD_MUTATION(
    $oldPassword: String!
    $password: String!
  ) {
    updatePassword(input:{
      old_password:$oldPassword,
      password:$password
    }) {
      status
      message
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $uuid: String!
    $username: String!
    $role_id: ID!
    $email: String!
    $first_name: String!
    $last_name: String!
    $gender: Gender!
    $contact_number: String
  ) {
    updateUser(input:{
      id: $id,
      uuid: $uuid,
      username: $username,
      email: $email,
      role_id: $role_id,
      first_name: $first_name,
      last_name: $last_name,
      gender: $gender,
      contact_number: $contact_number
    }) {
      id
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DELETE_USER_MUTATION(
    $id: ID!
  ) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const SYNC_ROLES_MUTATION = gql`
  mutation SYNC_ROLES_MUTATION($userId: Int!, $roleIds: [Int!]) {
    syncRoles(input: { user_id: $userId, role_ids: $roleIds }) {
      id
      roles {
        name
      }
    }
  }
`

export const MY_NOTIFICATIONS_QUERY = gql`
  query MY_NOTIFICATIONS_QUERY {
    myNotifications {
      id
      data {
        action
        url
        message
      }
      is_read
      created_at
    }
  }
`
