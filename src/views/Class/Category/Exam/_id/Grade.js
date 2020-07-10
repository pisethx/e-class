import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { GRADE_STUDENT_EXAM_MUTATION } from 'constants/grade'
import { NavLink } from 'react-router-dom'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import { STUDENT_EXAM_IDS_QUERY } from 'constants/grade'

const ClassExamShow = (props) => {
  const { data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })

  const STUDENT_EXAM_ID_RES = useQuery(STUDENT_EXAM_IDS_QUERY, {
    variables: {
      exam_id: props.examId,
    },
  })

  let studentExams = []
  if (STUDENT_EXAM_ID_RES) {
    studentExams = STUDENT_EXAM_ID_RES?.data?.studentExams
  }

  const [success, setSuccess] = useState(null)
  const exam = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams?.find((exam) => exam.id === props.examId)

  const { inputs, handleChange, resetForm } = useState(null)
  const [gradeExam, { loading, error }] = useMutation(GRADE_STUDENT_EXAM_MUTATION, {
    variables: {
      exam_id: props.examId,
      ...inputs,
    },
  })

  const onSubmit = async () => {
    try {
      // await gradeExam()
    } catch (e) {}
  }

  console.log(studentExams)
  if (loading) return <p>Loading...</p>

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between">
                <H3 className="title">Exam</H3>
              </CardHeader>
              <Error error={error} />
              <Success success={success} />
              <CardBody style={{ padding: '1rem 2rem' }}>
                {exam && Object.values(exam).length && (
                  <Form onSubmit={onSubmit}>
                    <PostCard
                      key={exam.id}
                      title={exam.name}
                      info={`Attempts: ${exam.attempts}`}
                      date={exam.publishes_at}
                      description={exam.description}
                    />
                    {exam.qa.map(({ id: _id, question, answers, possibles, points, type }, i) => (
                      <Card
                        key={_id}
                        style={{
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
                              <Label>X's answer:</Label>
                              {possibles?.map((possible, j) => (
                                <FormGroup check key={j}>
                                  <Label check>
                                    <Input type="checkbox" />
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
                              <Label for="textarea">X's answer: </Label>
                              <Input type="textarea" name="text" id="textarea" />
                            </FormGroup>
                          )}
                          {type === 'UPLOAD' && (
                            <FormGroup>
                              {/* <Input placeholder="File" type="file" name="file" required />
                              <Button className="btn-simple" color={uploadedFile ? 'success' : 'warning'}>
                                Upload File{uploadedFile ? ' Successfully' : ''}
                              </Button> */}
                            </FormGroup>
                          )}
                        </CardBody>
                      </Card>
                    ))}

                    <FormGroup>
                      <Label>Points (Max: {exam.qa.map((q) => q.points).reduce((a, b) => a + b)} Points)</Label>
                      <Input placeholder="Points" type="number" name="points" onChange={handleChange} required />
                    </FormGroup>
                    <Button className="btn-simple" type="submit" color="primary">
                      Submit
                    </Button>
                  </Form>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      )
    </>
  )
}

export default ClassExamShow
