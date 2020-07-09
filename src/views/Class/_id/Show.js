import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CLASS_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'
import { H3, IMG } from 'views/Styled/index'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col } from 'reactstrap'
import { from } from 'apollo-boost'

const ClassShow = (props) => {
  const { loading, error, data } = useQuery(CLASS_QUERY, {
    variables: {
      id: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`

  let eachClass = null
  if (data) eachClass = data.class

  return (
    <div className="content">
      {data && eachClass && (
        <Row>
          <Col xs="12">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <h3 className="title my-1">{eachClass.name}</h3>
                  {/* <h5 className="title mb-4">{eachClass.code}</h5> */}
                  <p className="description">{/* {authContext.user.roles[0].name} */}</p>
                </div>

                <div className="card-description my-6 mx-3">
                  <Row style={{ lineHeight: 2.53 }}>
                    <Col xs="12" className="title">
                      Class Information
                    </Col>
                    <Col xs="4">ID :</Col>
                    <Col xs="8">{eachClass.id}</Col>
                    <Col xs="4">Code :</Col>
                    <Col xs="8">{eachClass.code}</Col>
                    <Col xs="4">Teacher :</Col>
                    <Col xs="8">{`${eachClass?.teacher?.identity?.first_name} ${eachClass?.teacher?.identity?.last_name}`}</Col>
                    <Col xs="4">Class Categories :</Col>
                    <Col xs="8">
                      {eachClass.class_categories.map((category) => (
                        <span key={category.id}>{category.name}, </span>
                      ))}
                    </Col>
                    <Col xs="4">Schedule: </Col>
                    <Col xs="8">
                      {eachClass.schedules.map(({ sessions, id, day }) => (
                        <span key={id}>
                          <span>
                            {sessions.map(({ id: _id, start_time, end_time }) => (
                              <span className="mr-2" key={_id}>{`${day} (${start_time}-${end_time}).`}</span>
                            ))}
                          </span>
                        </span>
                      ))}
                    </Col>
                    <Col col="12" className="my-3">
                      <NavLink to={`/class/${props.id}/content`}>
                        <Button className="btn-simple m-2" color="success">
                          Contents
                        </Button>
                      </NavLink>
                      <NavLink to={`/class/${props.id}/category`}>
                        <Button className="btn-simple m-2" color="warning">
                          Categories
                        </Button>
                      </NavLink>
                      <NavLink to={`/class/${props.id}/forum`}>
                        <Button className="btn-simple m-2" color="info">
                          Forums
                        </Button>
                      </NavLink>
                      <NavLink to={`/class/${props.id}/attendance`}>
                        <Button className="btn-simple m-2" color="danger">
                          Attendance
                        </Button>
                      </NavLink>
                      {/* <NavLink to={`/class/${props.id}/schedule`}>
                        <Button className="btn-simple m-2" color="primary">
                          Schedule
                        </Button>
                      </NavLink> */}
                    </Col>
                    <hr />
                    <Col xs="12">List of Students :</Col>
                    <Col xs="12" className="mt-2 pa-2">
                      {eachClass?.students?.map((student) => (
                        <Row className="mx-2 my-3" key={student.id}>
                          <IMG alt="..." src={student.identity.photo_url} />
                          <span className="mx-3">{student.id}</span>
                          <p>{`${student.identity.first_name} ${student.identity.last_name}`}</p>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </div>
              </CardBody>
              {/* <CardFooter>
                <div className="button-container">
                  <Button className="btn-icon btn-round" color="facebook">
                    <i className="fab fa-facebook" />
                  </Button>
                  <Button className="btn-icon btn-round" color="twitter">
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button className="btn-icon btn-round" color="google">
                    <i className="fab fa-google-plus" />
                  </Button>
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ClassShow
