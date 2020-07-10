import React, { useContext } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { FORUMS_IN_CLASS_QUERY, CREATE_COMMENT_MUTATION, MARK_COMMENT_AS_ANSWER_MUTATION } from 'constants/forum'
import { NavLink } from 'react-router-dom'
import { H3, IMG } from 'views/Styled/index'
import useForm from 'lib/useForm'
import PostCard from 'components/Cards/Post'

import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import Loading from 'components/Loading'

// reactstrap components
import {
  Button,
  Card,
  Spinner,
  CardHeader,
  CardBody,
  CardText,
  Label,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap'
import { UNMARK_COMMENT_AS_ANSWER_MUTATION } from 'constants/forum'
import { DELETE_COMMENT_MUTATION } from 'constants/forum'
import { AuthContext } from 'contexts/auth'
import role from 'constants/data'

const ClassForumPost = (props) => {
  const client = useApolloClient()
  const authContext = useContext(AuthContext)

  const { data, refetch } = useQuery(FORUMS_IN_CLASS_QUERY, {
    variables: {
      classId: props.id,
    },
  })

  const { inputs, handleChange, resetForm } = useForm({
    comment: '',
  })

  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      forumId: props.forumId,
      comment: inputs.comment,
    },
  })

  if (loading) return <Spinner />
  if (error) return `Error! ${error}`

  let forums = {}
  if (data) forums = data?.forumsInClass?.find(({ id }) => id === props.forumId)

  let { id, title, author, created_at, description, comments, answer } = forums
  if (forums && answer) {
    const correct = comments.find((c) => c.id === answer.id)
    comments = comments.filter((c) => c.id !== correct.id)
    comments.unshift(correct)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await createComment()
      await refetch()
      resetForm()
    } catch (e) {}
  }
  return (
    <>
      {Object.values(forums).length ? (
        <div className="content">
          <Row>
            <Col md="12">
              <PostCard
                title={title}
                info={`${author?.identity?.first_name} ${author?.identity.last_name} @${author?.username}`}
                date={created_at}
                description={description}
              />
              <Card>
                <CardBody style={{ padding: '1rem' }}>
                  <Error error={error} />
                  {/* <Success success={success} /> */}
                  <Form onSubmit={onSubmit}>
                    <FormGroup>
                      <Label>Add Comment: </Label>
                      <Input type="textarea" name="comment" placeholder="Enter your comment" onChange={handleChange} required />
                    </FormGroup>
                    <Button color="primary" className="btn-sm" type="submit">
                      Comment
                    </Button>
                  </Form>
                </CardBody>
              </Card>
              {comments?.map(({ id: _id, comment, author: _author, created_at }, j) => (
                <Card key={j} id={_id} style={{ padding: '.6rem', position: 'relative' }} className={_id === answer?.id ? 'card-success' : ''}>
                  <CardHeader>
                    <IMG src={_author.identity.photo_url}></IMG>
                    {/* <NavLink to={`/users/${_author.id}`}> */}
                    <span
                      style={{ fontWeight: 'bold' }}
                      className="text-primary mx-3"
                    >{`${_author.identity.first_name} ${_author.identity.last_name} @${_author.username}`}</span>
                    {/* </NavLink> */}
                    {created_at}
                  </CardHeader>
                  <CardBody>
                    <CardText>{comment}</CardText>
                  </CardBody>
                  {(authContext.user.id === _author.id || role.name === 'teacher' || authContext.user.id === author.id) && (
                    <UncontrolledDropdown style={{ position: 'absolute', top: '5px', right: '5px' }}>
                      <DropdownToggle color="default" data-toggle="dropdown" nav onClick={(e) => e.preventDefault()}>
                        <p style={{ lineHeight: 0, fontSize: '1rem', fontWeight: 'bold' }}>.</p>
                        <p style={{ lineHeight: 0, fontSize: '1rem', fontWeight: 'bold' }}>.</p>
                        <p style={{ lineHeight: 0, fontSize: '1rem', fontWeight: 'bold' }}>.</p>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-navbar" right>
                        {(role.name === 'teacher' || authContext.user.id === author.id) && (
                          <DropdownItem
                            className="nav-item"
                            onClick={async (e) => {
                              try {
                                await client.mutate({
                                  mutation: _id !== answer?.id ? MARK_COMMENT_AS_ANSWER_MUTATION : UNMARK_COMMENT_AS_ANSWER_MUTATION,
                                  variables: {
                                    id: props.forumId,
                                    commentId: _id,
                                  },
                                })
                                refetch()
                              } catch (e) {
                                console.log(e)
                              }
                            }}
                          >
                            {_id !== answer?.id ? `Mark as Correct` : `Unmark`}
                          </DropdownItem>
                        )}
                        {(authContext.user.id === _author.id || role.name === 'teacher' || authContext.user.id === author.id) && (
                          <DropdownItem
                            className="nav-item"
                            onClick={async (e) => {
                              try {
                                await client.mutate({
                                  mutation: DELETE_COMMENT_MUTATION,
                                  variables: {
                                    id: _id,
                                  },
                                })
                                refetch()
                              } catch (e) {
                                console.log(e)
                              }
                            }}
                          >
                            Delete
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Card>
              ))}
            </Col>
          </Row>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ClassForumPost
