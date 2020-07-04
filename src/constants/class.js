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
      class_contents {
        id
        name
        description
        file_url
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
  query CLASSES_QUERY {
    classes {
      # data {
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
      # }
      # paginatorInfo {
      #   count
      #   currentPage
      #   hasMorePages
      #   lastPage
      #   total
      #   perPage
      #   lastItem
      #   firstItem
      # }
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

export const DELETE_CLASS_MUTATION = gql`
  mutation DELETE_CLASS_MUTATION($id: Int!) {
    deleteClass(id: $id) {
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
    createClassContent(
      input: { name: $name, description: $description, class_id: $classId }
    ) {
      id
      name
      description
      file_url
    }
  }
`

export const UPDATE_CLASS_CONTENT_MUTATION = gql`
  mutation UPDATE_CLASS_CONTENT_MUTATION(
    $id: Int!
    $name: String!
    $description: String!
    $classId: Int!
    $file: Upload
  ) {
    updateClassContent(
      input: { id: $id, name: $name, description: $description, file: $file }
    ) {
      id
      name
      description
      file_url
    }
  }
`

export const DELETE_CLASS_CONTENT_MUTATION = gql`
  mutation DELETE_CLASS_CONTENT_MUTATION($id: Int!) {
    deleteClassContent(id: $id) {
      id
      name
      description
      file_url
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

export const CLASS_CATEGORIES_QUERY = gql`
  query CLASS_QUERY($id: ID!) {
    class(id: $id) {
      id
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

export const CLASS_CONTENTS_QUERY = gql`
  query CLASS_QUERY($id: ID!) {
    class(id: $id) {
      id
      class_contents {
        id
        name
        description
        file_url
      }
    }
  }
`

export const CLASS_CATEGORY_QUERY = gql`
  query CLASS_CATEGORY_QUERY($id: ID!) {
    ClassCategory(id: $id) {
      id
      name
      weight
      exams {
        id
      }
      class {
        id
      }
    }
  }
`

export const CREATE_CLASS_CATEGORY_MUTATION = gql`
  mutation CREATE_CLASS_CATEGORY_MUTATION(
    $name: String!
    $weight: Float!
    $classId: Int!
  ) {
    createClassCategory(
      input: { name: $name, weight: $weight, class_id: $classId }
    ) {
      id
      name
      weight
    }
  }
`

export const UPDATE_CLASS_CATEGORY_MUTATION = gql`
  mutation UPDATE_CLASS_CATEGORY_MUTATION(
    $id: Int!
    $name: String!
    $weight: Float!
  ) {
    updateClassCategory(input: { name: $name, weight: $weight, id: $id }) {
      id
      name
      weight
    }
  }
`

export const DELETE_CLASS_CATEGORY_MUTATION = gql`
  mutation DELETE_CLASS_CATEGORY_MUTATION($id: Int!) {
    deleteClassCategory(id: $id) {
      id
      name
      weight
    }
  }
`

//startTime and endTime in 13:01:00 or 13:01 format
export const CREATE_CLASS_SCHEDULE_SESSION_MUTATION = gql`
  mutation CREATE_CLASS_SCHEDULE_SESSION_MUTATION(
    $day: DAY!
    $classId: Int!
    $startTime: String!
    $endTime: String!
  ) {
    createScheduleSession(
      input: {
        schedule: { upsert: { day: $day, class: { connect: $classId } } }
        start_time: $startTime
        end_time: $endTime
      }
    ) {
      id
      start_time
      end_time
      schedule {
        day
      }
    }
  }
`

//startTime and endTime in 13:01:00 or 13:01 format
export const DELETE_CLASS_SCHEDULE_SESSION_MUTATION = gql`
  mutation DELETE_CLASS_SCHEDULE_SESSION_MUTATION($id: Int!) {
    deleteScheduleSession(id: $id) {
      id
      start_time
      end_time
      schedule {
        day
      }
    }
  }
`

// list of student_attendances in this format
// [
//   {
//     student_id: $studentId
//     attendance_type: $attendanceType
//   }
// ]
export const CREATE_CLASS_ATTENDANCE_MUTATION = gql`
  mutation CREATE_CLASS_ATTENDANCE_MUTATION(
    $scheduleSessionId: Int!
    $classId: Int!
    $date: String!
    $studentAttendances: List!
  ) {
    createClassAttendance(
      input: {
        schedule_session_id: $scheduleSessionId
        class_id: $classId
        date: $date
        student_attendances: $studentAttendances
      }
    ) {
      id
      schedule_session_id
      date
      student_attendances {
        student {
          id
          identity {
            first_name
            last_name
          }
        }
      }
    }
  }
`

export const UPDATE_CLASS_ATTENDANCE_MUTATION = gql`
  mutation UPDATE_CLASS_ATTENDANCE_MUTATION(
    $id: Int!
    $studentAttendances: List!
  ) {
    createClassAttendance(
      input: { id: $id, student_attendances: $studentAttendances }
    ) {
      id
      schedule_session_id
      date
      student_attendances {
        student {
          id
          identity {
            first_name
            last_name
          }
        }
      }
    }
  }
`

export const DELETE_CLASS_ATTENDANCE_MUTATION = gql`
  mutation DELETE_CLASS_ATTENDANCE_MUTATION($id: Int!) {
    createClassAttendance(id: $id) {
      id
      schedule_session_id
      date
    }
  }
`
