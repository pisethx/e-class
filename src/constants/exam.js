import gql from 'graphql-tag'

export const CREATE_EXAM_MUTATION = gql`
  mutation CREATE_EXAM_MUTATION(
    $class_category_id: ID!
    $name: String!
    $description: String!
    $attempts: Int!
    $qa: [CreateQuestionInput!]
  ) {
    createExam(
      input: {
        class_category: { connect: $class_category_id }
        name: $name
        description: $description
        attempts: $attempts
        qa: $qa
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
