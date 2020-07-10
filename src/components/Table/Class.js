import React from 'react'
import { H3 } from 'views/Styled/index'
import { NavLink } from 'react-router-dom'
// reactstrap components
import { Button, Card, CardHeader, CardBody, CardTitle, CardFooter, CardText, FormGroup, Form, Input, Table, Row, Col } from 'reactstrap'
import Delete from 'components/Forms/Delete'
import { DELETE_CLASS_MUTATION } from 'constants/class'

const ClassTable = ({ classes, refetch, title = 'Classes', admin = false }) => {
  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <H3 className="title">{title}</H3>
          </CardHeader>
          <CardBody>
            <Table className="tablesorter">
              <thead className="text-primary">
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Teacher</th>
                  {admin && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {classes?.map((each) => (
                  <tr key={each.id}>
                    <td>{each.id}</td>
                    <td>{each.code}</td>
                    <td>
                      <NavLink style={{ fontWeight: 'bold' }} to={`/class/${each.id}`}>
                        {each.name}
                      </NavLink>
                    </td>
                    <td>{`${each.teacher?.identity?.first_name} ${each.teacher?.identity?.last_name}`}</td>
                    {admin && (
                      <td>
                        <NavLink to={`/class/${each.id}`}>
                          <Button size="sm" className="mr-3 my-1 animation-on-hover" color="info">
                            Show
                          </Button>
                        </NavLink>
                        <NavLink to={`/class/${each.id}/edit`}>
                          <Button size="sm" className="mr-3 my-1 animation-on-hover" color="success">
                            Edit
                          </Button>
                        </NavLink>
                        <Delete name={each.code} id={each.id} deleteMutation={DELETE_CLASS_MUTATION} refetch={refetch} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default ClassTable
