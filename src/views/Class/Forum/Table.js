import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { FORUMS_IN_CLASS_QUERY } from 'constants/forum'
import { NavLink } from 'react-router-dom'

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

const ForumTable = (props) => {
  const { loading, error, data } = useQuery(FORUMS_IN_CLASS_QUERY, {
    variables: {
      classId: props.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return `<p>Error ${error}</p>`

  const forums = data?.forum

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Class Forums</H3>

                <NavLink to={`/class/${props.id}/forum/create`}>
                  <Button className="animation-on-hover" color="primary">
                    Create Forum
                  </Button>
                </NavLink>
              </CardHeader>

              <CardBody>
                <Row>
                  {forums ? (
                    <Col>
                      <div class="card" style="width: 20rem;">
                        <div class="card-body">
                          <h4 class="card-title">Card title</h4>
                          <h6 class="card-subtitle mb-2 text-muted">
                            Card subtitle
                          </h6>
                          <p class="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </p>
                          <a href="#" class="card-link">
                            Card link
                          </a>
                          <a href="#" class="card-link">
                            Another link
                          </a>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    <Col>
                      <h3>No Forum found.... But you can always create one!</h3>
                    </Col>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      )
    </>
  )
}

export default ForumTable
