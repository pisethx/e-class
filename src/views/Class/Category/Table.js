import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Table, Row, Col } from 'reactstrap'
import Delete from 'components/Forms/Delete'
import { DELETE_CLASS_CATEGORY_MUTATION } from 'constants/class'
import role from 'constants/data'

const ClassCategoryTable = (props) => {
  const { loading, error, data, refetch } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const categories = data?.class?.class_categories

  const roleName = role.name

  return (
    <>
      {data && (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <H3 className="title">Class Categories</H3>

                  {roleName === 'teacher' && (
                    <NavLink to={`/class/${props.id}/category/create`}>
                      <Button className="animation-on-hover" color="primary">
                        Create Category
                      </Button>
                    </NavLink>
                  )}
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
                          <td>
                            <NavLink style={{ fontWeight: 'bold' }} to={`category/${id}/exam`}>
                              {name}
                            </NavLink>
                          </td>
                          <td>{weight}</td>
                          <td>
                            <NavLink
                              to={{
                                pathname: `category/${id}/exam`,
                                exams: exams,
                              }}
                            >
                              <Button size="sm" className="mr-3 my-1 animation-on-hover " color="info">
                                View All Exams
                              </Button>
                            </NavLink>
                            {roleName === 'teacher' && (
                              <>
                                <NavLink to={`category/${id}/exam/create`}>
                                  <Button size="sm" className="mr-3 my-1 animation-on-hover " color="warning">
                                    Create Exam
                                  </Button>
                                </NavLink>
                                <Button size="sm" className="mr-3 my-1 animation-on-hover" color="success">
                                  Edit
                                </Button>
                                <Delete name={name} id={id} refetch={refetch} deleteMutation={DELETE_CLASS_CATEGORY_MUTATION} />
                              </>
                            )}
                          </td>
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
