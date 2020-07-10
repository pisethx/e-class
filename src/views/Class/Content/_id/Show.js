import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { withRouter, NavLink } from 'react-router-dom'
import { Row, Col, Card, CardTitle, CardBody, Button } from 'reactstrap'
import { ONE_CLASS_CONTENT_QUERY } from 'constants/class'

const ClassContentShow = (props) => {
  const { loading, error, data } = useQuery(ONE_CLASS_CONTENT_QUERY, {
    variables: {
      id: props.contentId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return console.log(error)

  let classContent = null
  if (data) classContent = data?.classContent

  return (
    <>
      {classContent && Object.values(classContent).length > 0 && (
        <>
          <div className="content">
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                      <h3 className="title my-1">{classContent.name}</h3>
                    </div>
                    <div className="card-description my-6 mx-3" dangerouslySetInnerHTML={{ __html: classContent.description }}></div>
                    {classContent.file_url.length !== 0 && (
                      <a href={classContent.file_url} target="_blank">
                        <Button size="sm" className="btn-simple mr-3 my-1 animation-on-hover " color="info">
                          Download Attachment
                        </Button>
                      </a>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default withRouter(ClassContentShow)
