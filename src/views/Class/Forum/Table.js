import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { FORUMS_IN_CLASS_QUERY } from 'constants/forum'
import { NavLink } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Table,
  Row,
  Col,
} from 'reactstrap'

const ForumTable = (props) => {
  const { loading, error, data } = useQuery(FORUMS_IN_CLASS_QUERY, {
    variables: {
      classId: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `<p>Error ${error}</p>`

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
                {forums?.map(
                  ({
                    id,
                    title,
                    author,
                    description,
                    comments_count = 0,
                    created_at,
                    answer,
                  }) => (
                    <Card
                      style={{
                        boxShadow: '3px 5px 15px #1a1a1a',
                        padding: '.5rem',
                      }}
                    >
                      <CardHeader style={{ fontWeight: 'bold' }}>
                        {title}
                      </CardHeader>
                      <CardFooter style={{ fontWeight: 'bold' }}>
                        {`${author.identity.first_name} ${author.identity.last_name}`}{' '}
                        <br />
                        {created_at}
                      </CardFooter>
                      <CardBody>
                        <CardText className="mb-3">{description}</CardText>
                        <Button
                          size="sm"
                          className="mr-3 my-1 animation-on-hover "
                          color="info"
                        >
                          Comments ({comments_count})
                        </Button>
                        <Button
                          size="sm"
                          className="mr-3 my-1 animation-on-hover"
                          color="success"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="mr-3 my-1 animation-on-hover"
                          color="danger"
                        >
                          Delete
                        </Button>
                      </CardBody>
                    </Card>
                  )
                )}
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
