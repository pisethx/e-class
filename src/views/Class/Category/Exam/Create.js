import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { NavLink } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { CREATE_EXAM_MUTATION } from 'constants/exam'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'
import moment from 'moment'

// reactstrap components
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  FormFeedback,
  Form,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap'

const ClassCategoryExamCreate = (props) => {
  const [success, setSuccess] = useState('')

  const [questionCount, setQuestionCount] = useState(1)

  const [form, setForm] = useState({
    due_at: null,
    publishes_at: null,
    questions: new Array(1).fill({
      question: '',
      type: null,
      answers: [],
      possibles: [],
      points: null,
    }),
  })

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    description: '',
    attempts: 1,
  })

  const QUESTION_TYPES = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'QuestionTypes' },
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [createClassCategoryExam, { error, loading }] = useMutation(
    CREATE_EXAM_MUTATION,
    {
      variables: {
        class_category_id: props.categoryId,
        ...inputs,
      },
    }
  )

  if (loading) return <p>Loading...</p>
  // if (error) return `Error! ${error}`

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <H3 className="title">Create Exam</H3>
              </CardHeader>
              <Error error={error} />
              <Success success={success} />
              <CardBody>
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsButtonDisabled(true)
                    // setValidation(true)
                    try {
                      await createClassCategoryExam()
                      setSuccess('Success')
                      resetForm()
                      props.history.push(`/class/${props.id}/content`)
                    } catch (err) {}

                    setIsButtonDisabled(false)

                    // props.history.goBack()
                  }}
                >
                  <Row className="p-3">
                    <Col md="12">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          placeholder="Name"
                          type="text"
                          name="name"
                          value={inputs.name}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label>Description</Label>
                        <Input
                          placeholder="Description"
                          type="text"
                          name="description"
                          value={inputs.description}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Attempts</Label>
                        <Input
                          placeholder="Attempts"
                          type="number"
                          name="attempts"
                          value={inputs.attempts}
                          onChange={handleChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Dues At</Label>

                        <DatePicker
                          selected={form.due_at}
                          onChange={(date) => {
                            console.log(date)
                            setForm((prevState) => ({
                              ...prevState,
                              due_at: date,
                            }))
                          }}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="MMMM dd yyyy, h:mm:ss a"
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Publishes At</Label>

                        <DatePicker
                          selected={form.publishes_at}
                          onChange={(date) =>
                            setForm((prevState) => ({
                              ...prevState,
                              publishes_at: date.toISOString(),
                            }))
                          }
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="time"
                          dateFormat="MMMM dd yyyy, h:mm:ss a"
                        />
                      </FormGroup>
                    </Col>

                    {form?.questions?.length
                      ? form.questions.map((question, i) => (
                          <Col md="12" key={i}>
                            <Row>
                              <Col xs="10">
                                <Label>Question {i}</Label>
                              </Col>
                              <Col xs="2" className="align-self-end">
                                <Button
                                  className="btn-simple btn-sm"
                                  color="danger"
                                  onClick={(e) => {
                                    setForm((prevState) => ({
                                      ...prevState,
                                      questions: prevState.questions.filter(
                                        (_, idx) => idx !== i
                                      ),
                                    }))
                                  }}
                                >
                                  Delete
                                </Button>
                              </Col>

                              <Col xs="12">
                                <Label>
                                  {JSON.stringify(form.questions[i])}
                                </Label>
                                <FormGroup>
                                  <Input
                                    placeholder="Question"
                                    type="text"
                                    name="question"
                                    value={form.questions[i].question}
                                    onChange={(e) => {
                                      let updatedQuestions = form.questions
                                      updatedQuestions[i] = {
                                        ...updatedQuestions[i],
                                        question: e.target.value,
                                      }

                                      setForm((prevState) => ({
                                        ...prevState,
                                        questions: updatedQuestions,
                                      }))
                                    }}
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Label>Type</Label>
                                  <Select
                                    options={QUESTION_TYPES?.data?.__type.enumValues.map(
                                      ({ name }) => ({
                                        label: name,
                                        value: name,
                                      })
                                    )}
                                    value={{
                                      label: form.questions[i].type,
                                      value: form.questions[i].type,
                                    }}
                                    onChange={(e) => {
                                      // setForm((prevState) => ({
                                      //   ...prevState,
                                      //   teacher: {
                                      //     value: e.value,
                                      //     label: e.label,
                                      //   },
                                      // }))
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Label>Points</Label>
                                  <Input
                                    placeholder="Points"
                                    type="number"
                                    name="points"
                                    value={form.questions[i].points}
                                    onChange={(e) => {}}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        ))
                      : null}

                    <Col md="12">
                      <Button
                        className="btn-simple m-2"
                        color="success"
                        onClick={() => {
                          let updatedQuestions = form.questions
                          updatedQuestions.push({
                            question: '',
                            type: null,
                            answers: [],
                            possibles: [],
                            points: null,
                          })
                          setForm((prevState) => ({
                            ...prevState,
                            questions: updatedQuestions,
                          }))
                        }}
                      >
                        Add Question
                      </Button>
                    </Col>

                    <Col md="12" className="mt-1">
                      <Button
                        type="submit"
                        className="btn-fill"
                        color="primary"
                        disabled={isButtonDisabled}
                      >
                        Create Content
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ClassCategoryExamCreate
