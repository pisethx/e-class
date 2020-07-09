import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { FORUMS_IN_CLASS_QUERY } from 'constants/forum'
import { NavLink } from 'react-router-dom'
import { H3, IMG } from 'views/Styled/index'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Label, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col, Nav } from 'reactstrap'
import PostCard from 'components/Cards/Post'

const ForumTable = (props) => {
  // const { loading, error, data } = useQuery(FORUMS_IN_CLASS_QUERY, {
  //   variables: {
  //     classId: props.id,
  //   },
  // })

  // if (loading) return <p>Loading...</p>
  // if (error) return `Error! ${error}`

  // const forums = data?.forumsInClass
  //   ?.find((post) => post.id === props.postId)

  const forums = {
    id: 1,
    title: 'Test',
    author: {
      identity: {
        first_name: 'John',
        last_name: 'Cena',
      },
    },
    created_at: '2 mins ago',
    description: 'Test',
    comments: [
      {
        comment: 'Fuck You',
        author: {
          id: 1,
          identity: {
            first_name: 'John',
            last_name: 'Cena',
            photo_url: 'https://api.raymond.digital/users/12/portrait',
          },
        },
        created_at: '2 mins ago',
      },
      {
        comment: 'Fuck You',
        author: {
          id: 1,
          identity: {
            first_name: 'John',
            last_name: 'Cena',
            photo_url: 'https://api.raymond.digital/users/12/portrait',
          },
        },
        created_at: '2 mins ago',
      },
      {
        comment:
          'Fuck Yosadfasdfsdaf sf ldasfjksdajflskdajfldsa flajs dlfjasldfjasdl fasjdf lsadjflas dfj dsalfjlsad fjsald fjsaldfj alskdjf asdlkjflasd jflksu',
        author: {
          id: 1,
          identity: {
            first_name: 'John',
            last_name: 'Cena',
            photo_url: 'https://api.raymond.digital/users/12/portrait',
          },
        },
        created_at: '2 mins ago',
      },
      {
        comment: 'Fuck You',
        author: {
          id: 1,
          identity: {
            first_name: 'John',
            last_name: 'Cena',
            photo_url: 'https://api.raymond.digital/users/12/portrait',
          },
        },
        created_at: '2 mins ago',
      },
    ],
  }

  const { id, title, author, created_at, description, comments } = forums

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <PostCard title={title} info={`${author.identity.first_name} ${author.identity.last_name}`} date={created_at} description={description} />
            <Card>
              <CardBody style={{ padding: '1rem' }}>
                <FormGroup>
                  <Label>Add Comment: </Label>
                  <Input type="textarea" name="textarea" placeholder="Enter your comment" />
                </FormGroup>
                <Button color="primary" className="btn-sm">
                  Comment
                </Button>
              </CardBody>
            </Card>
            {comments.map(({ comment, author: _author, created_at }, j) => (
              <Card key={j}>
                <CardHeader>
                  <IMG src={_author.identity.photo_url}></IMG>
                  {/* <NavLink to={`/users/${_author.id}`}> */}
                  <span
                    style={{ fontWeight: 'bold' }}
                    className="text-primary mx-3"
                  >{`${_author.identity.first_name} ${_author.identity.last_name}`}</span>
                  {/* </NavLink> */}
                  {created_at}
                </CardHeader>
                <CardBody className="text-white">{comment}</CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      </div>
      )
    </>
  )
}

export default ForumTable
