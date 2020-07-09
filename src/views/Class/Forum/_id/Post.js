import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FORUMS_IN_CLASS_QUERY, CREATE_COMMENT_MUTATION } from 'constants/forum'
import { NavLink } from 'react-router-dom'
import { H3, IMG } from 'views/Styled/index'
import useForm from 'lib/useForm'
import PostCard from 'components/Cards/Post'

import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Label, FormGroup, Form, Input, Table, Row, Col, Nav } from 'reactstrap'

const ClassForumPost = (props) => {
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

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  let forums = {}
  if (data) forums = data?.forumsInClass?.find(({ id }) => id === props.forumId)

  const { id, title, author, created_at, description, comments } = forums

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
      {Object.values(forums).length && (
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
              {comments?.map(({ comment, author: _author, created_at }, j) => (
                <Card key={j}>
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
                  <CardBody className="text-white">{comment}</CardBody>
                </Card>
              ))}
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default ClassForumPost
