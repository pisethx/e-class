import gql from 'graphql-tag'

export const CREATE_EXAM_MUTATION = gql`
	mutation CREATE_EXAM_MUTATION(
		$name: String!
		$description: String
		$qa: [
			
		]
	)
`