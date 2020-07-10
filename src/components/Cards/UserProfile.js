import React, { useState, createRef, useRef, forwardRef, useContext } from 'react'

import { Button, Card, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col, Label } from 'reactstrap'
import ChangeEmail from 'components/Forms/ChangeEmail'
import ChangePassword from '../Forms/ChangePassword'
import { AuthContext } from 'contexts/auth'
import EditProfile from 'components/Forms/EditProfile'
import { NavLink } from 'react-router-dom'
import role from '../../constants/data'

const UserProfile = ({ user }) => {
  const authContext = useContext(AuthContext)
  return (
    <div className="content">
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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img alt="..." className="avatar" src={user.identity.photo_url} />
                  <h3 className="title my-1">{`${user.identity.first_name} ${user.identity.last_name}`}</h3>
                  <h5 className="title mb-4">{user.email}</h5>
                </a>
                <p className="description">
                  {user.roles
                    .map((role) => role.name)
                    .join(', ')
                    .toUpperCase()}
                </p>
              </div>
              <div className="card-description my-6 mx-3">
                <Row style={{ lineHeight: 2.53 }}>
                  <Col xs="12" className="title">
                    User Information
                  </Col>
                  <Col xs="6">Uuid :</Col>
                  <Col xs="6">{user.uuid}</Col>
                  <Col xs="6">Username :</Col>
                  <Col xs="6">{user.username}</Col>
                  <Col xs="6">Email :</Col>
                  <Col xs="6">
                    <Row xs="12" className="pl-3">
                      {user.email} <span className="pl-3"></span>
                      {user.id === authContext.user.id && <ChangeEmail oldEmail={user.email} />}
                    </Row>
                  </Col>
                  {user.id === authContext.user.id && (
                    <>
                      <Col xs="6">Password :</Col>
                      <Col xs="6">
                        {' '}
                        <ChangePassword />
                      </Col>
                    </>
                  )}
                  <Col xs="6">First Name :</Col>
                  <Col xs="6">{user.identity.first_name}</Col>
                  <Col xs="6">Last Name :</Col>
                  <Col xs="6">{user.identity.last_name}</Col>
                  <Col xs="6">Gender :</Col>
                  <Col xs="6">{user.identity.gender}</Col>
                  <Col xs="6">Phone :</Col>
                  <Col xs="6">{user.identity.contact_number}</Col>
                  {user.roles[0].name === 'student' && (
                    <>
                      <Col xs="6">Studying :</Col>
                      <Col xs="6">
                        {user.learnings.map((course) => (
                          <NavLink to={`/class/${course.id}`} className="text-bold" key={course.id}>
                            <b>{course.code}</b>
                            <br />
                          </NavLink>
                        ))}
                      </Col>
                    </>
                  )}
                  {user.roles[0].name === 'teacher' && (
                    <>
                      <Col xs="6">Lecturing :</Col>
                      <Col xs="6">
                        {user.teachings.map((course) => (
                          <NavLink to={`/class/${course.id}`} className="text-bold">
                            <b>{course.code}</b>
                            <br />
                          </NavLink>
                        ))}
                      </Col>
                    </>
                  )}
                </Row>
                <Row>
                  <div className="ml-3"></div>
                  {authContext.user.roles[0].name === 'admin' && <EditProfile user={user} size="lg" />}
                </Row>
              </div>
            </CardBody>
            <CardFooter>
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
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default UserProfile
