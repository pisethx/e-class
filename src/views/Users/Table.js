import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { NavLink } from 'react-router-dom'

import EditProfile from '../../components/Forms/EditProfile';
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

const UserTable = (props) => {
  const { loading, error, data, fetchMore } = useQuery(USERS_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  const users = data?.users
  return (
    <>
      {users && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <H3 className="title">Users</H3>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter">
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>UUID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Full Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user) => (
                        <tr>
                          <td>{user.id}</td>
                          <td>{user.uuid}</td>
                          <td>{user.username}</td>
                          <td>{user.roles[0].name}</td>
                          <td>
                            {user.identity?.first_name
                              ? `${user.identity?.first_name} ${user.identity?.last_name}`
                              : 'No Name'}
                          </td>
                          <td>
                            <NavLink to={`/user/${user.id}`}>
                              <Button
                                size="sm"
                                className="mr-3 my-1 animation-on-hover "
                                color="info"
                              >
                                Show
                              </Button>
                            </NavLink>
                            {/* <Button
                              size="sm"
                              className="mr-3 my-1 animation-on-hover"
                              color="success"
                            >
                              Edit
                            </Button> */}
                            <EditProfile user={user} size="sm" />
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

export default UserTable
