import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
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

const ClassCategoryTable = (props) => {
  const { loading, error, data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const categories = data?.class?.class_categories

  return (
    <>
      {data && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Class Categories</H3>

                  <NavLink to={`/class/${props.id}/category/create`}>
                    <Button className="animation-on-hover" color="primary">
                      Create Category
                    </Button>
                  </NavLink>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map(({ id, name, weight, exams }) => (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{name}</td>
                          <td>{weight}</td>
                          <td>
                            <NavLink to={`category/${id}`}>
                              <Button
                                size="sm"
                                className="mr-3 my-1 animation-on-hover "
                                color="info"
                              >
                                Go To Exam
                              </Button>
                            </NavLink>
                            <NavLink to={`category/${id}/exam/create`}>
                              <Button
                                size="sm"
                                className="mr-3 my-1 animation-on-hover "
                                color="warning"
                              >
                                Create Exam
                              </Button>
                            </NavLink>
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
                          </td>
                          {/* <td className="text-center">$36,738</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default ClassCategoryTable
