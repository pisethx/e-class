import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { NavLink } from 'react-router-dom'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import { STUDENT_EXAM_QUERY } from 'constants/exam'

const ForumTable = (props) => {
  const { data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })
  const exams = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams?.filter((exam) => exam.id === props.examId)

  const [form, setForm] = useState({
    answers: [],
  })

  // const [submitExam, { loading, error }] = useMutation(STUDENT_EXAM_QUERY, {
  //   variables: {
  //     ...form,
  //   },
  // })

  // if (loading) return <p>Loading...</p>

  const onSubmit = async () => {
    try {
      // await submitExam()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Exam</H3>

                {/* <NavLink to={`create`}>
                  <Button className="animation-on-hover" color="primary">
                    Create Exam
                  </Button>
                </NavLink> */}
              </CardHeader>
              <CardBody style={{ padding: '1rem 2rem' }}>
                {exams?.map(({ id, name, attempts, description, due_at, publishes_at, qa }) => (
                  <Form onSubmit={onSubmit} key={id}>
                    <PostCard key={id} title={name} info={`Attempts: ${attempts}`} date={publishes_at} description={description} />
                    {qa.map(({ id: _id, question, answers, possibles, points, type }, i) => (
                      <Card
                        key={_id}
                        style={{
                          boxShadow: '3px 5px 15px #1a1a1a',
                          padding: '.5rem',
                        }}
                      >
                        <CardHeader style={{ fontWeight: 'bold' }}>{`${_id}. ${question}`}</CardHeader>
                        <CardFooter style={{ fontWeight: 'bold' }}>
                          {`Points: ${points}`} <br />
                          {`Type: ${type}`}
                        </CardFooter>
                        <CardBody>
                          {type === 'QCM' && (
                            <>
                              <Label>Choose your answer:</Label>
                              {possibles?.map((possible, j) => (
                                <FormGroup check key={j}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      onChange={(e) => {
                                        form.answers[i] = form.answers[i].filter((ans) => ans !== j)
                                        if (e.target.checked) form.answers[i].push(j)
                                      }}
                                    />
                                    {possible}
                                    <span className="form-check-sign">
                                      <span className="check"></span>
                                    </span>
                                  </Label>
                                </FormGroup>
                              ))}
                            </>
                          )}

                          {type === 'ESSAY' && (
                            <FormGroup>
                              <Label for="textarea">Write your answer here: </Label>
                              <Input type="textarea" name="text" id="textarea" />
                            </FormGroup>
                          )}
                          {type === 'UPLOAD' && (
                            <FormGroup>
                              <Input placeholder="File" type="file" name="file" required />
                              <Button className="btn-simple" color="info">
                                Upload File
                              </Button>
                            </FormGroup>
                          )}
                        </CardBody>
                      </Card>
                    ))}
                    <Button className="btn-simple" type="submit" color="primary">
                      Submit
                    </Button>
                  </Form>
                ))}
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
