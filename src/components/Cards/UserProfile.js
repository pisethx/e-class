import React from 'react'
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

const UserProfile = ({ user }) => {
  return (
    <div className="content">
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
                  {user.roles
                    .map((role) => role.name)
                    .join(', ')
                    .toUpperCase()}
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
    </div>
  )
}

export default UserProfile
