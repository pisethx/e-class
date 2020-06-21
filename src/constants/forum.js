import gql from 'graphql-tag'

export const CREATE_FORUM_MUTATION = gql`
	mutation CREATE_FORUM_MUTATION(
		$title: String!,
		$description: String!,
		$classContentId: Int!
	) {
		mutation createForum(input: {
			title: $title,
			description: $description,
			class_content_id: $$classContentId
		}) {
			id
			title
			description
		}
	}
`

export const UPDATE_FORUM_MUTATION = gql`
	mutation UPDATE_FORUM_MUTATION(
		$id: Int!,
		$title: String!,
		$description: String!,
		$answer: {
			connect: Int,
			disconnect: Boolean
		}
	) {
		mutation updateForum(input: {
			id: $id,
			title: $title,
			description: $description,
			answer: $answer
		}) {
			id
			title
			description
			answer {
				comment
				author {
					id
					identity {
						first_name
						last_name
						photo_url
					}
				}
			}
		}
	}
`

export const DELETE_FORUM_MUTATION = gql`
	mutation DELETE_FORUM_MUTATION(
		$id: Int!
	) {
		mutation deleteForum(input: {
			id: $id,
		}) {
			id
		}
	}
`

export const CREATE_COMMENT_MUTATION = gql`
	mutation CREATE_COMMENT_MUTATION(
		$comment: String!
		$forumId: Int!
	) {
		mutation createComment(input: {
			comment: $comment,
			commentable: {
				connect: {
					type: FORUM,
					id: $forumId
				}
			}
		}) {
			id
			comment
		}
	}
`

export const UPDATE_COMMENT_MUTATION = gql`
	mutation UPDATE_COMMENT_MUTATION(
		$id: Int!
		$comment: String!
	) {
		mutation updateComment(input: {
			id: $id,
			comment: $comment
		}) {
			id
			comment
		}
	}
`

export const DELETE_COMMENT_MUTATION = gql`
	mutation DELETE_COMMENT_MUTATION(
		$id: Int!
	) {
		mutation deleteComment(id: $id) {
			id
			comment
		}
	}
`

export const FORUMS_IN_CLASS_QUERY = gql`
	mutation FORUMS_IN_CLASS_QUERY(
		$first: Int!
		$page: Int!
		$classId: Int!
	) {
		mutation forumsInClass(
			first: $first,
			page: $page,
			class_id: $classId
		) {
			data {
				id
				title
				description
				author {
					id
					identity {
						first_name
						last_name
						photo_url
					}
				}
				comments_count
				answer {
					id
					comment
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

export const FORUM_QUERY = gql`
	mutation FORUM_QUERY(
		$id: Int!
		$commentFirst: Int!
		$commentPage: Int!
	) {
		mutation forum(
			id: $id
		) {
			id
			title
			description
			author {
				id
				identity {
					first_name
					last_name
					photo_url
				}
			}
			comments(first: $commentFirst, page: $commentPage) {
				comment
				author {
					id
					identity {
						first_name
						last_name
						photo_url
					}
				}
			}
			comments_count
			answer {
				id
				comment
			}
		}
	}
`

export const MY_FORUMS_QUERY = gql`
	mutation MY_FORUMS_QUERY(
		$first: Int!
		$page: Int!
	) {
		mutation myForums(first: $first, page: $page) {
			data {
				id
				title
				comments_count
				answer {
					id
					comment
				}
				created_at
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


export const MY_COMMENTS_QUERY = gql`
	mutation MY_COMMENTS_QUERY(
		$first: Int!
		$page: Int!
	) {
		mutation myComments(first: $first, page: $page) {
			data {
				id
				comment
				commentable {
					...on Forum {
						id
						title
						comments_count
						answer {
							id
							comment
						}
					}
				}
				created_at
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