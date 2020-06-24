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

// export const CREATE_CLASS_MUTATION = gql`
// 	mutation CREATE_CLASS_MUTATION(
// 		$name: String!,
//     $code: String!,
//     $teacher: {
//       create: {
//         username: String!,
//         password: String!,
//         email: String!,
// 				uuid: String,
//         identity: {
//           create: {
//             first_name: String!,
//             last_name: String!,
//             gender: Gender!,
//           }
//         }
//       }
// 			connect: Int!
//     }
// 	) {
// 		mutation createClass(
// 			name: $name,
// 			code: $code,
// 			teacher: $teacher
// 		) {
// 			id
// 			name
// 			code
// 			teacher {
// 				id
// 				identity {
// 					first_name
// 					last_name
// 					photo_url
// 				}
// 			}
// 		}
// 	}
// `

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
