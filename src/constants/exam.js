import gql from 'graphql-tag'

export const CREATE_EXAM_MUTATION = gql`
  mutation CREATE_EXAM_MUTATION(
    $class_category_id: ID!
    $name: String!
    $description: String!
    $attempts: Int!
    $qa: [CreateQuestionInput!]
    $publishes_at: String!
    $due_at: String!
  ) {
    createExam(
      input: {
        class_category: { connect: $class_category_id }
        name: $name
        description: $description
        attempts: $attempts
        qa: $qa
        due_at: $due_at
        publishes_at: $publishes_at
      }
    ) {
      id
      name
      qa {
        question
        type
        answers
        possibles
      }
    }
  }
`

export const DELETE_EXAM_MUTATION = gql`
  mutation DELETE_EXAM_MUTATION($id: ID!) {
    deleteExam(id: $id) {
      id
    }
  }
`

export const MY_EXAMS_IN_CLASS_QUERY = gql`
  query MY_EXAMS_IN_CLASS_QUERY($class_id: ID!) {
    myExamsInClass(class_id: $class_id) {
      id
      exam {
        id
      }
      answer {
        answers
        file {
          url
          name
        }
        points
      }
      points
      attempts
      created_at
    }
  }
`

export const STUDENT_EXAM_QUERY = gql`
  query STUDENT_EXAM_QUERY($id: ID!) {
    studentExam(id: $id) {
      id
      answer {
        answers
        file {
          url
          name
        }
        points
      }
      points
      attempts
      created_at
    }
  }
`
