import gql from 'graphql-tag'


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

export const STUDENT_SCORES_IN_CLASS_QUERY = gql`
  query STUDENT_SCORES_IN_CLASS_QUERY(
      $class_id: ID!
  ) {
    studentScoresInClass(class_id:$class_id) {
        student_id
        score
        overall
      }
  }
`

export const MY_SCORE_IN_CLASS_QUERY = gql`
  query MY_SCORE_IN_CLASS_QUERY(
      $class_id: ID!
  ) {
    myScoreInClass(class_id:$class_id) {
        student_id
        score
        overall
      }
  }
`