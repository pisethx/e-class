import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CURRENT_USER_QUERY } from '../lib/User'
import { authContext, AuthContext } from '../contexts/auth'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import { from } from 'apollo-boost'

const UserProfile = (props) => {
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState({})
  // const { loading, error, data } = useQuery(CURRENT_USER_QUERY)

  // if (loading) return <p>Loading...</p>
  // if (error) return `Error! ${error}`
  useEffect(() => {
    setUser(() => authContext.user)
  }, [authContext])

  return (
    <div className="content">
      {Object.values(user).length > 0 && (
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar"
                      src={user.identity.photo_url}
                    />
                    <h3 className="title my-1">{`${user.identity.first_name} ${user.identity.last_name}`}</h3>
                    <h5 className="title mb-4">{user.email}</h5>
                  </a>
                  <p className="description">
                    {authContext.user.roles[0].name}
                  </p>
                </div>
                <div className="card-description my-6 mx-3">
                  <Row style={{ lineHeight: 2.53 }}>
                    <Col md="12" className="title">
                      User Information
                    </Col>
                    <Col md="6">Uuid :</Col>
                    <Col md="6">{user.uuid}</Col>
                    <Col md="6">Username :</Col>
                    <Col md="6">{user.username}</Col>
                    <Col md="6">Gender :</Col>
                    <Col md="6">{user.identity.gender}</Col>
                    <Col md="6">Phone :</Col>
                    <Col md="6">{user.identity.contact_number}</Col>
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
      )}
    </div>
  )
}

export default UserProfile
