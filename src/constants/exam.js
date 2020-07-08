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

export const STUDENT_EXAM_IDS_QUERY = gql`
  mutation STUDENT_EXAM_IDS_QUERY(
    $class_id: ID!
  ) {
    studentExamIds(id: $class_id)
  }
`

export const GRADE_STUDENT_EXAM_MUTATION = gql`
  mutation GRADE_STUDENT_EXAM_MUTATION(
    $id: ID!
    $answer: [GradeExamAnswerInput]
  ) {
    gradeStudentExam(input: {
      id: $id,
      answer: $answer
    }) {
      id
    }
  }
`

export const MY_EXAMS_IN_CLASS_QUERY = gql`
  query MY_EXAMS_IN_CLASS_QUERY(
    $class_id: ID!
  ) {
    myExamsInClass(class_id: $class_id) {
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

export const STUDENT_EXAM_QUERY = gql`
  query STUDENT_EXAM_QUERY(
    $id: ID!
  ) {
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

export const STUDENT_TAKES_EXAM_MUTATION = gql`
  mutation STUDENT_TAKES_EXAM_MUTATION(
    $exam_id: ID!
    $answers: [CreateExamAnswerInput]
  ) {
    studentTakesExam(
      input: {
        exam_id: $exam_id,
        answer: $answers
      }
    ) {
      id
      attempts
      answer {
        id
        answers
        file {
          url
          name
        }
        points
      }
      points
    }
  }
`