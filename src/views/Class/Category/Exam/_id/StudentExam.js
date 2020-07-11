import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { H3 } from 'views/Styled/index'
import { CLASS_CATEGORIES_QUERY } from 'constants/class'
import { GRADE_STUDENT_EXAM_MUTATION } from 'constants/grade'
import { NavLink } from 'react-router-dom'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import moment from 'moment'
// reactstrap components
import { Button, Card, CardHeader, CardBody, Row, Col, Form, FormGroup, Label, Input, CardFooter, Spinner } from 'reactstrap'
import PostCard from 'components/Cards/Post'
import { STUDENT_EXAM_IDS_QUERY } from 'constants/grade'
import Loading from 'components/Loading'

const StudentExam = (props) => {
  const [exam, setExam] = useState(props.exam)
  const [form, setForm] = useState([])

  useEffect(() => {
    if (props.exam) {
      setExam((prevState) => props.exam)
      console.log(exam)
      setForm((prevState) =>
        props.exam.qa.map((q) => ({ id: q.id, points: props.exam.answer.find((ans) => ans.id === q.id)?.points?.toString() || '' }))
      )
    }
  }, [props.exam])

  const [success, setSuccess] = useState(null)

  const [gradeExam, { loading, error }] = useMutation(GRADE_STUDENT_EXAM_MUTATION, {
    variables: {
      id: props.exam?.id,
      answer: form,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await gradeExam(form)
      setSuccess('Success')
      props.setNext()
    } catch (e) {
      console.log(e)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      {props.exam && exam && (
        <>
          <Error error={error} />
          <Success success={success} />
          <CardBody className="p-0 py-3">
            <Form onSubmit={onSubmit}>
              {form && exam && Object.values(exam).length ? (
                <>
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
                            <Label>{exam.student.identity.first_name}'s answer:</Label>
                            {possibles?.map((possible, j) => (
                              <FormGroup check key={j}>
                                <Label check>
                                  <Input
                                    readOnly
                                    type="checkbox"
                                    checked={exam?.answer?.find((ans) => ans?.id === _id).answers?.includes(possible)}
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
                            <Label for="textarea">{exam.student.identity.first_name}'s answer: </Label>
                            <Input readOnly type="textarea" name="text" id="textarea" value={exam?.answer?.find((ans) => ans?.id === _id).answers} />
                          </FormGroup>
                        )}

                        {type === 'UPLOAD' && (
                          <FormGroup>
                            <Label for="textarea">{exam.student.identity.first_name}'s answer: </Label>
                            <a href={exam?.answer?.find((ans) => ans?.id === _id).file.url} target="_blank">
                              {exam?.answer?.find((ans) => ans?.id === _id).file.name}
                            </a>
                          </FormGroup>
                        )}

                        <FormGroup>
                          <Label>Points: </Label>
                          <Input
                            placeholder="Points"
                            type="text"
                            name="points"
                            defaultValue={form.find((f) => f?.id === _id)?.points}
                            onChange={(e) => {
                              console.log(form.find((f) => f?.id === _id)?.points)
                              const points = form
                              const idx = points.indexOf(points.find((p) => p.id === _id))
                              points[idx].points = e.target.value
                              console.log(points)
                              setForm((prevState) => points)
                            }}
                            required
                          />
                        </FormGroup>
                      </CardBody>
                    </Card>
                  ))}

                  <Button className="btn-simple" type="submit" color="primary">
                    Submit
                  </Button>
                </>
              ) : (
                <Loading />
              )}
            </Form>
          </CardBody>
        </>
      )}
    </>
  )
}

export default StudentExam
