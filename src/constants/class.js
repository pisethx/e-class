import gql from 'graphql-tag'

export const CLASS_QUERY = gql`
  query CLASS_QUERY($id: ID!) {
    class(id: $id) {
      id
      name
      code
      teacher {
        id
        identity {
          first_name
          last_name
          photo_url
        }
      }
      students {
        id
        identity {
          first_name
          last_name
          photo_url
        }
      }
      class_categories {
        id
        name
        weight
        exams {
          id
          name
          possible
        }
      }
    }
  }
`

export const CLASSES_QUERY = gql`
  query CLASSES_QUERY($first: Int!, $page: Int!) {
    classes(first: $first, page: $page) {
      data {
        id
        name
        code
        teacher {
          id
          identity {
            first_name
            last_name
            photo_url
          }
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

export const CREATE_CLASS_MUTATION = gql`
  mutation CREATE_CLASS_MUTATION(
    $name: String!
    $code: String!
    $teacher: ID! # $students: [ID!]
  ) {
    createClass(
      input: {
        name: $name
        code: $code
        teacher: { connect: $teacher }
        # students: { connect: $students }
      }
    ) {
      id
      name
      code
    }
  }
`

export const UPDATE_CLASS_MUTATION = gql`
  mutation UPDATE_CLASS_MUTATION(
    $name: String!
    $code: String!
    $teacher: ID!
    $students: [ID!]
  ) {
    updateClass(
      input: {
        name: $name
        code: $code
        teacher: { connect: $teacher }
        students: { connect: $students }
      }
    ) {
      id
      name
      code
    }
  }
`

export const CREATE_CLASS_CONTENT_MUTATION = gql`
  mutation CREATE_CLASS_CONTENT_MUTATION(
    $name: String!
    $description: String!
    $classId: Int!
  ) {
    mutation
    createClassContent(
      input: { name: $name, description: $description, class_id: $classId }
    ) {
      id
      name
      code
    }
  }
`

export const SYNC_STUDENTS_MUTATION = gql`
  mutation SYNC_STUDENTS_MUTATION($classId: Int!, $studentIds: [Int!]) {
    mutation
    syncStudents(
      input: { class_id: $classId, students: { sync: $studentIds } }
    ) {
      id
      students {
        id
        identity {
          first_name
          last_name
          photo_url
        }
      }
    }
  }
`
