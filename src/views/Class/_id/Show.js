import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CLASS_QUERY } from '../../../constants/class'
import styled from 'styled-components'

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

const IMG = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`

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
                    <h3 className="title my-1">{eachClass.name}</h3>
                    {/* <h5 className="title mb-4">{eachClass.code}</h5> */}
                  </a>
                  <p className="description">
                    {/* {authContext.user.roles[0].name} */}
                  </p>
                </div>
                <div className="card-description my-6 mx-3">
                  <Row style={{ lineHeight: 2.53 }}>
                    <Col md="12" className="title">
                      Class Information
                    </Col>
                    <Col md="6">ID :</Col>
                    <Col md="6">{eachClass.id}</Col>
                    <Col md="6">Code :</Col>
                    <Col md="6">{eachClass.code}</Col>
                    <Col md="6">Teacher :</Col>
                    <Col md="6">{`${eachClass.teacher.identity.first_name} ${eachClass.teacher.identity.last_name}`}</Col>
                    <Col md="6">Class Categories :</Col>

                    <Col md="6">
                      {eachClass.class_categories.map((category) => (
                        <>
                          <span key={category.id}>{category.name}, </span>
                        </>
                      ))}
                    </Col>
                    <Col md="12">Students :</Col>
                    <Col md="12" className="mt-2">
                      {eachClass.students.map((student) => (
                        <Row className="my-2" key={student.id}>
                          <Col md="1"></Col>
                          <Col md="1">
                            <IMG alt="..." src={student.identity.photo_url} />
                          </Col>
                          <Col className="text-center" md="1">
                            {student.id}
                          </Col>
                          <Col md="9">{`${student.identity.first_name} ${student.identity.last_name}`}</Col>
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
