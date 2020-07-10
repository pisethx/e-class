import React, { useContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CLASS_CATEGORY_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

// reactstrap components
import { Button, Card, CardHeader, CardBody, CardFooter, CardText, FormGroup, Form, Input, Row, Col, Spinner } from 'reactstrap'
import { from } from 'apollo-boost'

const IMG = styled.img`
  border-radius: 50%;
  width: 100%;
`

const ClassCategoryShow = (props) => {
  const { loading, error, data } = useQuery(CLASS_CATEGORY_QUERY, {
    variables: {
      id: props.categoryId,
    },
  })

  if (loading) return <Spinner />
  if (error) return `Error! ${error}`

  let category = null

  if (data) category = data?.class_category

  return (
    <div className="content">
      {category && (
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
                  <h3 className="title my-1">{category.name}</h3>
                  {/* <h5 className="title mb-4">{eachClass.code}</h5> */}
                  <p className="description">{/* {authContext.user.roles[0].name} */}</p>
                </div>

                <div className="card-description my-6 mx-3">
                  <Row style={{ lineHeight: 2.53 }}>
                    <Col xs="12" className="title">
                      Class Information
                    </Col>
                    <Col xs="6">ID :</Col>
                    <Col xs="6">{category.id}</Col>
                    <Col xs="6">Name :</Col>
                    <Col xs="6">{category.name}</Col>
                    <Col xs="6">Weight :</Col>
                    <Col xs="6">{category.weight}</Col>
                    <Col xs="6">Exams :</Col>

                    {/* <Col xs="6">
                      {eachClass.class_categories.map((category) => (
                        <span key={category.id}>{category.name}, </span>
                      ))}
                    </Col> */}
                    <Col col="12" md="4">
                      <NavLink to={`/class/${props.id}/content`}>
                        <Button className="animation-on-hover" color="success">
                          View Class Contents
                        </Button>
                      </NavLink>
                    </Col>
                    <hr />
                    <Col xs="12" className="mt-2">
                      {/* {eachClass.students.map((student) => (
                        <Row className="my-2" key={student.id}>
                          <Col xs="1"></Col>
                          <Col xs="1" className="mb-3"></Col>
                          <Col className="text-center" xs="1">
                            {student.id}
                          </Col>
                          <Col xs="9">{`${student.identity.first_name} ${student.identity.last_name}`}</Col>
                        </Row>
                      ))} */}
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

export default ClassCategoryShow
