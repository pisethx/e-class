import gql from 'graphql-tag'

export const STUDENT_EXAM_IDS_QUERY = gql`
  query STUDENT_EXAM_IDS_QUERY($exam_id: ID!) {
    studentExams(exam_id: $exam_id) {
      id
      attempts
      created_at
      updated_at
      answer {
        id
        answers
        file {
          url
          name
        }
        points
      }
      student {
        id
        identity {
          first_name
          last_name
        }
      }
    }
  }
`

export const GRADE_STUDENT_EXAM_MUTATION = gql`
  mutation GRADE_STUDENT_EXAM_MUTATION($id: ID!, $answer: [GradeExamAnswerInput!]) {
    gradeStudentExam(input: { id: $id, answer: $answer }) {
      id
    }
  }
`

export const STUDENT_TAKES_EXAM_MUTATION = gql`
  mutation STUDENT_TAKES_EXAM_MUTATION($exam_id: ID!, $answers: [CreateExamAnswerInput!]) {
    studentTakesExam(input: { exam_id: $exam_id, answer: $answers }) {
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
  query STUDENT_SCORES_IN_CLASS_QUERY($class_id: ID!) {
    studentScoresInClass(class_id: $class_id) {
      student_id
      score
      overall
    }
  }
`

export const MY_SCORE_IN_CLASS_QUERY = gql`
  query MY_SCORE_IN_CLASS_QUERY($class_id: ID!) {
    myScoreInClass(class_id: $class_id) {
      student_id
      score
      overall
    }
  }
`
