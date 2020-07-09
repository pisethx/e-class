import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { FORUMS_IN_CLASS_QUERY } from 'constants/forum'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col } from 'reactstrap'
import PostCard from 'components/Cards/Post'

const ForumTable = (props) => {
  const { loading, error, data } = useQuery(FORUMS_IN_CLASS_QUERY, {
    variables: {
      classId: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  const forums = data?.forumsInClass
    ?.find((post) => post.id === props.postId)
    .return(
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Class Forums</H3>
                </CardHeader>
                <CardBody style={{ padding: '1rem 2rem' }}>
                  {forums?.map(({ id, title, author, description, comments_count = 0, created_at, answer }) => (
                    <PostCard
                      title={title}
                      info={`${author.identity.first_name} ${author.identity.last_name}`}
                      date={created_at}
                      description={description}
                      showBtn={{
                        name: `Comments (${comments_count})`,
                        path: `forum/id`,
                      }}
                      editBtn={{
                        name: 'Edit',
                        path: `forum/id`,
                      }}
                      deleteBtn={{
                        name: 'Delete',
                        path: `forum/id`,
                      }}
                    />
                  ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        )
      </>
    )
}

export default ForumTable
