import React, { useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { FORUMS_IN_CLASS_QUERY } from 'constants/forum'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col, Spinner } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import Delete from 'components/Forms/Delete'
import { DELETE_FORUM_MUTATION } from '../../../constants/forum'
import { AuthContext } from 'contexts/auth'
import role from '../../../constants/data'

const ClassForumTable = (props) => {
  const authContext = useContext(AuthContext)
  const { loading, error, data, refetch } = useQuery(FORUMS_IN_CLASS_QUERY, {
    variables: {
      classId: props?.id,
    },
  })

  if (loading) return <Spinner />
  if (error) return `Error! ${error}`

  const forums = data?.forumsInClass

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Class Forums</H3>

                <NavLink to={`/class/${props.id}/forum/create`}>
                  <Button className="animation-on-hover" color="primary">
                    Create Forum
                  </Button>
                </NavLink>
              </CardHeader>
              <CardBody style={{ padding: '1rem 2rem' }}>
                {forums?.map(({ id, title, author, description, comments_count = 0, created_at, answer, class_content }) => (
                  <PostCard
                    key={id}
                    deleteMutation={DELETE_FORUM_MUTATION}
                    title={title}
                    id={id}
                    info={`${author.identity.first_name} ${author.identity.last_name}@${author.username}`}
                    date={created_at}
                    description={description}
                    badge={class_content.name}
                    showBtn={{
                      name: `Comments (${comments_count})`,
                      path: `forum/${id}`,
                    }}
                    editBtn={{
                      name: 'Edit',
                      path: `forum/${id}`,
                    }}
                    refetch={refetch}
                    deleteBtn={author.id === authContext.user.id || role.name === 'teacher'}
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

export default ClassForumTable
