import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { STUDENT_TAKES_EXAM_MUTATION } from 'constants/grade'
import { NavLink } from 'react-router-dom'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'

// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter, Spinner } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import { STUDENT_EXAM_QUERY } from 'constants/exam'

const ClassExamShow = (props) => {
  const { data } = useQuery(CLASS_CATEGORIES_QUERY, {
    variables: {
      id: props.id,
    },
  })
  const [uploadedFile, setUploadedFile] = useState(false)
  const [success, setSuccess] = useState(null)
  const exam = data?.class?.class_categories.find((category) => category.id === props.categoryId)?.exams?.find((exam) => exam.id === props.examId)
  const [form, setForm] = useState([])
  useEffect(() => {
    if (exam) {
      setForm(
        exam?.qa.map(({ id, type }) => ({
          id,
          answers: type === 'QCM' ? [] : '',
        }))
      )
    }
  }, [exam])

  const [submitExam, { loading, error }] = useMutation(STUDENT_TAKES_EXAM_MUTATION, {
    variables: {
      exam_id: props.examId,
      ...form,
    },
  })

  if (loading) return <Spinner />

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(form)
      await submitExam()
      setSuccess('Success')
    } catch (e) {}
  }

  const updateForm = (idx, newValue) => {
    let updatedState = form
    updatedState[idx].answers = newValue
    setForm(updatedState)
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
                              <Label>Choose your answer:</Label>
                              {possibles?.map((possible, j) => (
                                <FormGroup check key={j}>
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      onChange={(e) => {
                                        let updatedState = form
                                        updatedState[i].answers = updatedState[i].answers.filter((ans) => ans !== possible)
                                        if (e.target.checked) updatedState[i].answers.push(possible)

                                        setForm(updatedState)
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
                              <Input
                                type="textarea"
                                name="text"
                                id="textarea"
                                onChange={(e) => {
                                  updateForm(i, e.target.value)
                                }}
                              />
                            </FormGroup>
                          )}
                          {type === 'UPLOAD' && (
                            <FormGroup>
                              <Input
                                placeholder="File"
                                type="file"
                                name="file"
                                required
                                onChange={({
                                  target: {
                                    validity,
                                    files: [file],
                                  },
                                }) => {
                                  updateForm(i, file)
                                  setUploadedFile(true)
                                }}
                              />
                              <Button className="btn-simple" color={uploadedFile ? 'success' : 'warning'}>
                                Upload File{uploadedFile ? ' Successfully' : ''}
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
