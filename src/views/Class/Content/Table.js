import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CONTENT_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'
import PostCard from 'components/Cards/Post'
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col } from 'reactstrap'

const ClassContentTable = (props) => {
  const { loading, error, data } = useQuery(CLASS_CONTENT_QUERY, {
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
                  {contents?.map(({ id, name, description, file_url }) => (
                    <PostCard key={id} title={name} description={description} anchorBtn={{ name: 'View Content', path: file_url }} />
                  ))}
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
