import gql from 'graphql-tag'

export const CREATE_FORUM_MUTATION = gql`
  mutation CREATE_FORUM_MUTATION($title: String!, $description: String!, $classContentId: ID!) {
    createForum(input: { title: $title, description: $description, class_content_id: $classContentId }) {
      id
      title
      description
    }
  }
`

export const UPDATE_FORUM_MUTATION = gql`
  mutation UPDATE_FORUM_MUTATION($id: ID!, $title: String, $description: String) {
    updateForum(input: { id: $id, title: $title, description: $description }) {
      id
      title
      description
    }
  }
`

export const DELETE_FORUM_MUTATION = gql`
  mutation DELETE_FORUM_MUTATION($id: ID!) {
    deleteForum(id: $id) {
      id
    }
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($comment: String!, $forumId: ID!) {
    createComment(input: { comment: $comment, commentable: { connect: { type: FORUM, id: $forumId } } }) {
      id
      comment
    }
  }
`

export const UPDATE_COMMENT_MUTATION = gql`
  mutation UPDATE_COMMENT_MUTATION($id: ID!, $comment: String!) {
    updateComment(input: { id: $id, comment: $comment }) {
      id
      comment
    }
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation DELETE_COMMENT_MUTATION($id: ID!) {
    deleteComment(id: $id) {
      id
      comment
    }
  }
`

export const MARK_COMMENT_AS_ANSWER_MUTATION = gql`
  mutation MARK_COMMENT_AS_ANSWER_MUTATION($id: ID!, $commentId: ID!) {
    updateForum(input: { id: $id, answer: { connect: $commentId } }) {
      id
      title
      answer {
        id
        comment
      }
    }
  }
`

export const UNMARK_COMMENT_AS_ANSWER_MUTATION = gql`
  mutation UNMARK_COMMENT_AS_ANSWER_MUTATION($id: ID!) {
    updateForum(input: { id: $id, answer: { disconnect: true } }) {
      id
      title
      answer {
        id
        comment
      }
    }
  }
`

export const FORUMS_IN_CLASS_QUERY = gql`
  query FORUMS_IN_CLASS_QUERY($classId: ID!) {
    forumsInClass(class_id: $classId) {
      id
      title
      description
      author {
        id
        username
        identity {
          id
          first_name
          last_name
          photo_url
        }
      }
      comments {
        id
        comment
        author {
          id
          username
          identity {
            id
            first_name
            last_name
            photo_url
          }
        }
        created_at
      }
      comments_count
      class_content {
        id
        name
      }
      answer {
        id
        comment
      }
      created_at
    }
  }
`

export const FORUM_QUERY = gql`
  query FORUM_QUERY($id: ID!) {
    forum(id: $id) {
      id
      title
      description
      author {
        id
        identity {
          id
          first_name
          last_name
          photo_url
        }
      }
      comments {
        comment
        author {
          id
          identity {
            id
            first_name
            last_name
            photo_url
          }
        }
      }
      comments_count
      answer {
        id
        comment
      }
      created_at
    }
  }
`

export const MY_FORUMS_QUERY = gql`
  query MY_FORUMS_QUERY {
    myForums {
      id
      title
      comments_count
      answer {
        id
        comment
      }
      created_at
      class {
        id
      }
    }
  }
`

export const MY_COMMENTS_QUERY = gql`
  query MY_COMMENTS_QUERY {
    myComments {
      id
      comment
      commentable {
        ... on Forum {
          id
          title
          comments_count
          class {
            id
          }
          answer {
            id
            comment
          }
        }
      }
      created_at
    }
  }
`
