import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import useForm from 'lib/useForm'
import { FormWrapper, H3 } from 'views/Styled/index'
import { USERS_QUERY } from 'constants/user'
import { CREATE_CLASS_MUTATION } from 'constants/class'
import Error from 'views/shared/ErrorMessage'
import Success from 'views/shared/SuccessMessage'
import { selectable } from 'lib/util'
import Select from 'react-select'
import { GET_ENUM_QUERY } from 'views/Unauthenticated/Api'
import './Create.style.css'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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
  Spinner,
} from 'reactstrap'

const CreateClass = (props) => {
  let users = []
  let teachers = []
  let students = []
  const [selectedStudents, setSelectedStudents] = useState([])

  const USERS_QUERY_RES = useQuery(USERS_QUERY)

  const DAYS = useQuery(GET_ENUM_QUERY, {
    variables: { name: 'Day' },
  })

  if (USERS_QUERY_RES?.data) {
    users = USERS_QUERY_RES?.data?.users
    students = users?.filter((user) => user.roles.map((role) => role.name).includes('student'))

    teachers = users?.filter(
      (user) => user.roles.map((role) => role.name).includes('teacher') || user.roles.map((role) => role.name).includes('admin')
    )
    if (students && students.length) students = selectable(students)
    if (teachers && teachers.length) teachers = selectable(teachers)
  }

  const [success, setSuccess] = useState('')

  const time = [...Array(24).keys()].map((_, i) => ({
    label: ('0' + i).substr(-2) + ':00',
    value: ('0' + i).substr(-2) + ':00',
  }))

  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    code: '',
  })
  const [form, setForm] = useState({
    teacher: '',
    students: [],
    schedule_session: new Array(7).fill({
      schedule: {
        day: null,
      },
      start_time: null,
      end_time: null,
    }),
  })

  const [validation, setValidation] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [createClass, { loading, error }] = useMutation(CREATE_CLASS_MUTATION, {
    variables: {
      ...inputs,
      teacher: form.teacher.value,
      students: form.students.map((student) => student.value),
      schedule_session: form.schedule_session.filter((ss) => !Object.values(ss).includes(null) || !Object.values(Object.values(ss)).includes(null)),
    },
  })

  if (loading) return <Spinner />
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <H3 className="title">Create Class</H3>
            </CardHeader>
            <Error error={error} />
            <Success success={success} />
            {teachers && students && teachers.length && students.length && (
              <CardBody>
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsButtonDisabled(true)
                    // setValidation(true)
                    try {
                      inputs.students = selectedStudents
                      await createClass({
                        ...inputs,
                        ...form,
                      })
                      setSuccess('Success')
                      resetForm()
                    } catch (err) {
                      console.log(err)
                    }

                    setIsButtonDisabled(false)

                    // props.history.goBack()
                  }}
                >
                  <Row className="p-3">
                    <Col md="12">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input placeholder="name" type="text" name="name" value={inputs.name} onChange={handleChange} required />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <Label>Code</Label>
                        <Input placeholder="code" type="text" name="code" value={inputs.code} onChange={handleChange} required />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Teacher</Label>
                        <Select
                          options={teachers}
                          value={form.teacher}
                          onChange={(e) => {
                            setForm((prevState) => ({
                              ...prevState,
                              teacher: {
                                value: e.value,
                                label: e.label,
                              },
                            }))
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Students</Label>
                        <Select
                          options={students}
                          isMulti={true}
                          value={form.students}
                          closeMenuOnSelect={false}
                          onChange={(e) => {
                            setForm((prevState) => ({
                              ...prevState,
                              students: e,
                            }))
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <Label className="mb-4">Schedule Session</Label>
                      {DAYS &&
                        DAYS.data &&
                        DAYS?.data.__type?.enumValues?.map(({ name }, i) => (
                          <Row key={i} className="mb-4">
                            <Col md="4">
                              <Label>{name}</Label>
                            </Col>
                            <Col md="4">
                              <Select
                                options={time}
                                value={
                                  form.schedule_session[i].start_time
                                    ? {
                                        value: form.schedule_session[i].start_time,
                                        label: form.schedule_session[i].start_time,
                                      }
                                    : null
                                }
                                onChange={(e) => {
                                  let scheduleSession = form.schedule_session
                                  scheduleSession[i] = {
                                    ...scheduleSession[i],
                                    schedule: {
                                      upsert: {
                                        day: name,
                                      },
                                    },
                                    start_time: e.value,
                                  }
                                  setForm((prevState) => ({
                                    ...prevState,
                                    schedule_session: scheduleSession,
                                  }))
                                }}
                              />
                            </Col>

                            <Col md="4">
                              <Select
                                options={time}
                                value={
                                  form.schedule_session[i].end_time
                                    ? {
                                        value: form.schedule_session[i].end_time,
                                        label: form.schedule_session[i].end_time,
                                      }
                                    : null
                                }
                                onChange={(e) => {
                                  let scheduleSession = form.schedule_session
                                  scheduleSession[i] = {
                                    ...scheduleSession[i],
                                    schedule: {
                                      upsert: {
                                        day: name,
                                      },
                                    },
                                    end_time: e.value,
                                  }
                                  setForm((prevState) => ({
                                    ...prevState,
                                    schedule_session: scheduleSession,
                                  }))
                                }}
                              />
                            </Col>
                          </Row>
                        ))}
                    </Col>
                    <Col md="12" className="mt-1">
                      <Button type="submit" className="btn-fill" color="primary" disabled={isButtonDisabled}>
                        Create Class
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateClass
