import gql from 'graphql-tag'

export const CLASS_QUERY = gql`
  query CLASS_QUERY($id: ID!) {
    class(id: $id) {
      id
      name
      code
      teacher {
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
      students {
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
      schedules {
        id
        day
        sessions {
          id
          start_time
          end_time
        }
      }
      student_scores {
        student_id
        score
        overall
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
  mutation CREATE_CLASS_MUTATION($name: String!, $code: String!, $teacher: ID!, $students: [ID!], $schedule_session: [CreateScheduleSessionInput!]) {
    createClass(
      input: {
        name: $name
        code: $code
        teacher: { connect: $teacher }
        students: { sync: $students }
        schedule_sessions: { sync: $schedule_session }
      }
    ) {
      id
      code
      teacher {
        id
        username
      }
      students {
        id
        username
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
`

export const UPDATE_CLASS_MUTATION = gql`
  mutation UPDATE_CLASS_MUTATION($id: ID!, $name: String!, $code: String!, $teacher: ID!, $students: [ID!]) {
    updateClass(input: { id: $id, name: $name, code: $code, teacher: { connect: $teacher }, students: { connect: $students } }) {
      id
      name
      code
    }
  }
`

export const DELETE_CLASS_MUTATION = gql`
  mutation DELETE_CLASS_MUTATION($id: ID!) {
    deleteClass(id: $id) {
      id
      name
      code
    }
  }
`

export const CREATE_CLASS_CONTENT_MUTATION = gql`
  mutation CREATE_CLASS_CONTENT_MUTATION($name: String!, $description: String!, $classId: Int!, $file: Upload) {
    createClassContent(input: { name: $name, description: $description, class_id: $classId, file: $file }) {
      id
      name
      description
      file_url
    }
  }
`

export const UPDATE_CLASS_CONTENT_MUTATION = gql`
  mutation UPDATE_CLASS_CONTENT_MUTATION($id: ID!, $name: String!, $description: String!, $file: Upload) {
    updateClassContent(input: { id: $id, name: $name, description: $description, file: $file }) {
      id
      name
      description
      file_url
    }
  }
`

export const DELETE_CLASS_CONTENT_MUTATION = gql`
  mutation DELETE_CLASS_CONTENT_MUTATION($id: ID!) {
    deleteClassContent(id: $id) {
      id
    }
  }
`

export const SYNC_STUDENTS_MUTATION = gql`
  mutation SYNC_STUDENTS_MUTATION($classId: Int!, $studentIds: [Int!]) {
    mutation
    syncStudents(input: { class_id: $classId, students: { sync: $studentIds } }) {
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
          description
          attempts
          due_at
          publishes_at

          qa {
            id
            question
            type
            answers
            possibles
            points
          }
        }
      }
    }
  }
`

export const CLASS_CONTENT_QUERY = gql`
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

export const ONE_CLASS_CONTENT_QUERY = gql`
  query ONE_CLASS_CONTENT_QUERY($id: ID!) {
    classContent(id: $id) {
      id
      name
      description
      file_url
    }
  }
`

export const CLASS_CATEGORY_QUERY = gql`
  query CLASS_CATEGORY_QUERY($id: ID!) {
    classCategoriesInClass(class_id: $id) {
      id
      name
      weight
    }
  }
`

export const ATTENDANCE_IN_CLASS_QUERY = gql`
  query ATTENDANCE_IN_CLASS_QUERY($id: ID!) {
    class(id: $id) {
      id
      class_attendances {
        id
        date
        schedule_session {
          id
          start_time
          end_time
        }
        student_attendances {
          id
          attendance_type
          student {
            id
            identity {
              id
              first_name
              last_name
            }
          }
        }
      }
    }
  }
`

export const CLASS_ATTENDANCE_QUERY = gql`
  query CLASS_ATTENDANCE_QUERY($id: ID!) {
    classAttendance(id: $id) {
      id
      date
      schedule_session {
        id
        start_time
        end_time
      }
      student_attendances {
        id
        attendance_type
        student {
          id
          identity {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
`

export const CREATE_CLASS_CATEGORY_MUTATION = gql`
  mutation CREATE_CLASS_CATEGORY_MUTATION($name: String!, $weight: Float!, $classId: Int!) {
    createClassCategory(input: { name: $name, weight: $weight, class_id: $classId }) {
      id
      name
      weight
    }
  }
`

export const UPDATE_CLASS_CATEGORY_MUTATION = gql`
  mutation UPDATE_CLASS_CATEGORY_MUTATION($id: Int!, $name: String!, $weight: Float!) {
    updateClassCategory(input: { name: $name, weight: $weight, id: $id }) {
      id
      name
      weight
    }
  }
`

export const DELETE_CLASS_CATEGORY_MUTATION = gql`
  mutation DELETE_CLASS_CATEGORY_MUTATION($id: ID!) {
    deleteClassCategory(id: $id) {
      id
      name
      weight
    }
  }
`

//startTime and endTime in 13:01:00 or 13:01 format
export const CREATE_CLASS_SCHEDULE_SESSION_MUTATION = gql`
  mutation CREATE_CLASS_SCHEDULE_SESSION_MUTATION($day: DAY!, $classId: Int!, $startTime: String!, $endTime: String!) {
    createScheduleSession(input: { schedule: { upsert: { day: $day, class: { connect: $classId } } }, start_time: $startTime, end_time: $endTime }) {
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
    $schedule_session_id: Int!
    $id: Int!
    $date: Date!
    $student_attendances: [CreateStudentAttendanceInput!]
  ) {
    createClassAttendance(
      input: { schedule_session_id: $schedule_session_id, class_id: $id, date: $date, student_attendances: $student_attendances }
    ) {
      id
      schedule_session {
        id
      }
      date
      student_attendances {
        id
        student {
          id
          identity {
            id
            first_name
            last_name
          }
        }
      }
    }
  }
`

export const UPDATE_CLASS_ATTENDANCE_MUTATION = gql`
  mutation UPDATE_CLASS_ATTENDANCE_MUTATION($id: ID!, $date: Date!, $student_attendances: [UpdateStudentAttendanceInput!]) {
    updateClassAttendance(input: { id: $id, date: $date, student_attendances: $student_attendances }) {
      id
      schedule_session {
        id
      }
      date
      student_attendances {
        id
        student {
          id
          identity {
            id
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
