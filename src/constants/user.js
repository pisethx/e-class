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

export const USERS_FIND_BY_UUID_QUERY = gql`
  query USERS_FIND_BY_UUID_QUERY($first: Int!, $page: Int!, $uuid: String!) {
    usersFindByUuid(first: $first, page: $page, uuid: $uuid) {
      data {
        id
        username
        email
        uuid
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
      }
      paginatorInfo {
        count
        currentPage
        hasMorePages
        lastPage
        total
        perPage
        lastItem
        firstItem
      }
    }
  }
`

export const USERS_FIND_BY_USERNAME_QUERY = gql`
  query USERS_FIND_BY_USERNAME_QUERY(
    $first: Int!
    $page: Int!
    $username: String!
  ) {
    usersFindByUuid(first: $first, page: $page, username: $username) {
      data {
        id
        username
        email
        uuid
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
      }
      paginatorInfo {
        count
        currentPage
        hasMorePages
        lastPage
        total
        perPage
        lastItem
        firstItem
      }
    }
  }
`

export const USERS_QUERY = gql`
  query USERS_QUERY($first: Int!, $page: Int!) {
    users(first: $first, page: $page) {
      data {
        id
        username
        email
        uuid
        roles {
          name
        }
        identity {
          first_name
          last_name
          gender
          photo_url
        }
      }
      paginatorInfo {
        count
        currentPage
        hasMorePages
        lastPage
        total
        perPage
        lastItem
        firstItem
      }
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

export const NOTIFICATIONS_QUERY = gql`
  query NOTIFICATIONS_QUERY($first: Int!, $page: Int!) {
    notifications(first: $first, page: $page) {
      data {
        id
        data
        is_read
      }
      paginatorInfo {
        count
        currentPage
        hasMorePages
        lastPage
        total
        perPage
        lastItem
        firstItem
      }
    }
  }
`
