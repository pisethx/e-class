import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from '../../Styled/index'
import { CLASS_CONTENTS_QUERY } from '../../../constants/class'
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

const ClassContentTable = (props) => {
  const { loading, error, data } = useQuery(CLASS_CONTENTS_QUERY, {
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
                    <Card
                      style={{
                        boxShadow: '3px 5px 15px #1a1a1a',
                        padding: '.5rem',
                      }}
                    >
                      <CardHeader style={{ fontWeight: 'bold' }}>
                        {name}
                      </CardHeader>
                      <CardBody>
                        <CardText className="my-3">{description}</CardText>
                        <a href={file_url} target="_blank">
                          <Button
                            size="sm"
                            className="mr-3 my-1 animation-on-hover "
                            color="info"
                          >
                            View File Content
                          </Button>
                        </a>
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
