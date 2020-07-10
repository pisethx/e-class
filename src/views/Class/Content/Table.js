import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CONTENT_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'
import PostCard from 'components/Cards/Post'
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col } from 'reactstrap'
import { DELETE_CLASS_CONTENT_MUTATION } from 'constants/class'
import role from 'constants/data'

const ClassContentTable = (props) => {
  const { loading, error, data, refetch } = useQuery(CLASS_CONTENT_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const contents = data?.class?.class_contents
  return (
    <>
      {contents && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Class Contents</H3>

                  <NavLink to={`/class/${props.id}/content/create`}>
                    <Button className="animation-on-hover" color="primary">
                      Create Content
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardBody style={{ padding: '1rem 2rem' }}>
                  <Row>
                    {contents?.map(({ id, name, description, file_url }) => (
                      <>
                        <Col xs="12" md="6" lg="4">
                          <PostCard
                            key={id}
                            id={id}
                            refetch={refetch}
                            deleteMutation={DELETE_CLASS_CONTENT_MUTATION}
                            title={name}
                            deleteBtn={role.name === 'teacher'}
                            showBtn={{ name: 'Show', path: `content/${id}` }}
                          />
                        </Col>
                      </>
                    ))}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default ClassContentTable
