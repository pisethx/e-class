import React, { useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { NavLink } from 'react-router-dom'

import EditProfile from '../../components/Forms/EditProfile'
// reactstrap components
import { AuthContext } from 'contexts/auth'
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col } from 'reactstrap'
import Delete from 'components/Forms/Delete'
import { DELETE_USER_MUTATION } from 'constants/user'

const UserTable = (props) => {
  const { loading, error, data, fetchMore } = useQuery(USERS_QUERY)
  const authContext = useContext(AuthContext)
  const client = useApolloClient()

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
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.uuid}</td>
                          <td>{user.username}</td>
                          <td>{user.roles[0].name}</td>
                          <td>{user.identity?.first_name ? `${user.identity?.first_name} ${user.identity?.last_name}` : 'No Name'}</td>
                          <td>
                            <NavLink to={`/user/${user.id}`}>
                              <Button size="sm" className="mr-3 my-1 animation-on-hover " color="info">
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
                            {authContext.user.id !== user.id && (
                              <Delete
                                name={`${user.identity?.first_name} ${user.identity?.last_name}`}
                                id={user.id}
                                deleteMutation={DELETE_USER_MUTATION}
                              />
                            )}
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
