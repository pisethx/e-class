import React, { useContext, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from '../Styled/index'
import { CLASS_QUERY } from '../../constants/class'
import { AuthContext } from '../../contexts/auth'

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

const ClassDashboard = (props) => {
  const authContext = useContext(AuthContext)

  const { loading, error, data, fetchMore } = useQuery(CLASS_QUERY, {
    variables: {
      id: authContext?.user?.id,
      first: 1,
      page: 1,
    },
  })

  useEffect(() => {
    console.log(authContext);
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  const { paginatorInfo, data: classes } = data?.classes

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">classes</H3>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter">
                <thead className="text-primary">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes?.map((each) => (
                    <tr>
                      <td>{each.id}</td>
                      {/* <td>{user.username}</td>
                      <td>
                        {user.identity?.first_name
                          ? `${user.identity?.first_name} ${user.identity?.last_name}`
                          : 'No Name'}
                      </td> */}
                      <td>
                        <Button size="sm" className="mr-3 my-1" color="info">
                          Show
                        </Button>
                        <Button size="sm" className="mr-3 my-1" color="success">
                          Edit
                        </Button>
                        <Button size="sm" className="mr-3 my-1" color="danger">
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
  )
}

export default ClassDashboard
